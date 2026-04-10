const vertexShaderSource = `#version 300 es
#pragma vscode_glsllint_stage: vert

uniform float uPointSize;
uniform vec2 uPosition;

void main() 
{
    gl_Position = vec4(uPosition, 0.0, 1.0);
    gl_PointSize = uPointSize;
}`;

const fragmentShaderSource = `#version 300 es
#pragma vscode_glsllint_stage: frag

precision mediump float;

uniform int uIndex;
uniform vec4 uColors[3];

out vec4 frag_color;

void main() 
{
    frag_color = uColors[uIndex];
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

const uPositionLoc = gl.getUniformLocation(program, 'uPosition');
gl.uniform2f(uPositionLoc, 0, -.7);

const uPointSizeLoc = gl.getUniformLocation(program, 'uPointSize');
gl.uniform1f(uPointSizeLoc, 100);

const uIndexLoc = gl.getUniformLocation(program, 'uIndex');
const uColorsLoc = gl.getUniformLocation(program, 'uColors');

gl.uniform1i(uIndexLoc, 1);
gl.uniform4fv(uColorsLoc, [
    1,0,0,1,
    0,.5,.5,1,
    0,0,1,1,
]);

gl.drawArrays(gl.POINTS, 0, 1);