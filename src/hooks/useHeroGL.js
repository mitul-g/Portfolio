import { useEffect } from 'react';

export function useHeroGL(canvasRef) {
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    let gl;
    try {
      gl = cv.getContext('webgl') || cv.getContext('experimental-webgl');
    } catch (e) {}
    if (!gl) {
      cv.style.background =
        'radial-gradient(700px circle at 70% 30%, rgba(177,91,255,0.3), transparent 60%), #08070c';
      return;
    }
    const vs = 'attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }';
    const fs = `precision highp float;
uniform vec2 u_res; uniform float u_time; uniform vec2 u_mouse;
float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
  float a=hash(i), b=hash(i+vec2(1.0,0.0)), c=hash(i+vec2(0.0,1.0)), d=hash(i+vec2(1.0,1.0));
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y); }
float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<6;i++){ v+=a*noise(p); p=p*2.0+vec2(1.7,9.2); a*=0.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 asp = vec2(u_res.x/u_res.y, 1.0);
  vec2 p = uv*asp*2.3;
  float t = u_time*0.11;
  vec2 m = (u_mouse/u_res.xy)*asp;
  vec2 q = vec2(fbm(p+vec2(0.0,t)), fbm(p+vec2(5.2,1.3)));
  vec2 r = vec2(fbm(p+2.0*q+vec2(1.7,9.2)+t*0.7), fbm(p+2.0*q+vec2(8.3,2.8)-t*0.5));
  float md = distance(uv*asp, m);
  float ripple = 0.16/(md+0.28);
  float f = fbm(p + 2.6*r + ripple);
  vec3 deep = vec3(0.035,0.022,0.06);
  vec3 violet = vec3(0.55,0.27,0.95);
  vec3 pink = vec3(0.96,0.33,0.74);
  vec3 blue = vec3(0.30,0.36,0.96);
  vec3 teal = vec3(0.16,0.80,0.74);
  vec3 amber = vec3(1.0,0.62,0.25);
  vec3 col = mix(deep, violet, clamp(f*1.5,0.0,1.0));
  col = mix(col, pink, clamp(r.x*r.y*1.7,0.0,1.0));
  col = mix(col, blue, clamp(q.x-0.45,0.0,1.0)*0.85);
  col = mix(col, teal, clamp(r.y-0.62,0.0,1.0)*0.7);
  col = mix(col, amber, clamp(q.y-0.7,0.0,1.0)*0.5);
  col += violet*ripple*0.22;
  vec3 hue = mix(teal, amber, 0.5+0.5*sin(u_time*0.7));
  hue = mix(hue, pink, 0.5+0.5*sin(u_time*0.43+1.7));
  float hov = smoothstep(0.55, 0.0, md);
  col = mix(col, hue, hov*0.8);
  float vig = smoothstep(1.15, 0.25, length(uv-0.5));
  col *= 0.54 + 0.2*vig;
  gl_FragColor = vec4(col, 1.0);
}`;
    const mk = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, mk(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, mk(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      cv.style.background =
        'radial-gradient(700px circle at 70% 30%, rgba(177,91,255,0.3), transparent 60%), #08070c';
      return;
    }
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, 'u_res');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    const resize = () => {
      const r = cv.getBoundingClientRect();
      cv.width = Math.max(1, r.width * dpr);
      cv.height = Math.max(1, r.height * dpr);
      gl.viewport(0, 0, cv.width, cv.height);
    };
    resize();
    window.addEventListener('resize', resize);
    let tmx = cv.width / 2,
      tmy = cv.height * 0.6,
      cmx = tmx,
      cmy = tmy;
    const mm = (e) => {
      const r = cv.getBoundingClientRect();
      tmx = (e.clientX - r.left) * dpr;
      tmy = (r.height - (e.clientY - r.top)) * dpr;
    };
    window.addEventListener('mousemove', mm);
    const t0 = performance.now();
    let raf = 0;
    const render = () => {
      cmx += (tmx - cmx) * 0.06;
      cmy += (tmy - cmy) * 0.06;
      gl.uniform2f(uRes, cv.width, cv.height);
      gl.uniform1f(uTime, (performance.now() - t0) / 1000);
      gl.uniform2f(uMouse, cmx, cmy);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };
    render();
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', mm);
      cancelAnimationFrame(raf);
    };
  }, [canvasRef]);
}
