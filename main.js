const vertexShaderSource = `#version 300 es
#pragma vscode_glsllint_stage: vert

void main() 
{
    gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
    gl_PointSize = 150.0;
}`;

const fragmentShaderSource = `#version 300 es
#pragma vscode_glsllint_stage: frag

precision mediump float;

out vec4 frag_color;

void main() 
{
    frag_color = vec4(0.0, 0.0, 0.0, 1.0);
}`;

const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl2');

const program = gl.createProgram();

const vertex_shader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertex_shader, vertexShaderSource);
gl.compileShader(vertex_shader);
gl.attachShader(program, vertex_shader);

const fragment_shader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragment_shader, fragmentShaderSource);
gl.compileShader(fragment_shader);
gl.attachShader(program, fragment_shader);

gl.linkProgram(program);

if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log(gl.getShaderInfoLog(vertex_shader));
    console.log(gl.getShaderInfoLog(fragment_shader));
}
gl.useProgram(program);

gl.drawArrays(gl.POINTS, 0, 1);