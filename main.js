const vertexShaderSource = `#version 300 es
#pragma vscode_glsllint_stage: vert

in float aPointSize;
in vec2 aPosition;
in vec3 aColor;

out vec3 vColor;

void main() 
{
    vColor = aColor;
    gl_Position = vec4(aPosition, 0.0, 1.0);
    gl_PointSize = aPointSize;
}`;

const fragmentShaderSource = `#version 300 es
#pragma vscode_glsllint_stage: frag

precision mediump float;

in vec3 vColor;

out vec4 frag_color;

void main() 
{
    frag_color = frag_color = vec4(vColor, 1.0);
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

const bufferData = new Float32Array([
    0,-1,            50,            1,1,0,
    -.5,.5,         50,             0,1,1,
    .5,0,         50,             1,0,1,
]);
const aPositionLoc = gl.getAttribLocation(program, 'aPosition');
const aPointSizeLoc = gl.getAttribLocation(program, 'aPointSize');
const aColorLoc = gl.getAttribLocation(program, 'aColor');

gl.enableVertexAttribArray(aPositionLoc);
gl.enableVertexAttribArray(aPointSizeLoc);
gl.enableVertexAttribArray(aColorLoc);

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, bufferData, gl.STATIC_DRAW);

gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 6 * 4, 0);
gl.vertexAttribPointer(aPointSizeLoc, 1, gl.FLOAT, false, 6 * 4 , 2 * 4);
gl.vertexAttribPointer(aColorLoc, 3, gl.FLOAT, false, 6 * 4, 3 * 4);

gl.drawArrays(gl.TRIANGLES, 0, 3);