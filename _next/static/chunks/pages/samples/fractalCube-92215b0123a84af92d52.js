_N_E=(window.webpackJsonp_N_E=window.webpackJsonp_N_E||[]).push([[15],{"1uVF":function(e,n,t){"use strict";t.d(n,"e",(function(){return r})),t.d(n,"a",(function(){return a})),t.d(n,"b",(function(){return i})),t.d(n,"d",(function(){return o})),t.d(n,"c",(function(){return s}));var r=40,a=0,i=32,o=36,s=new Float32Array([1,-1,1,1,1,0,1,1,1,1,-1,-1,1,1,0,0,1,1,0,1,-1,-1,-1,1,0,0,0,1,0,0,1,-1,-1,1,1,0,0,1,1,0,1,-1,1,1,1,0,1,1,1,1,-1,-1,-1,1,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,-1,1,1,1,0,1,1,0,1,1,-1,-1,1,1,0,0,1,0,0,1,1,-1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,-1,-1,1,1,0,0,1,0,0,-1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,-1,1,1,1,0,1,0,0,-1,1,-1,1,0,1,0,1,1,0,-1,1,1,1,0,1,1,1,1,1,1,1,-1,1,1,1,0,1,0,0,-1,-1,1,1,0,0,1,1,1,1,-1,1,1,1,0,1,1,1,0,1,-1,1,-1,1,0,1,0,1,0,0,-1,-1,-1,1,0,0,0,1,1,0,-1,-1,1,1,0,0,1,1,1,1,-1,1,-1,1,0,1,0,1,0,0,1,1,1,1,1,1,1,1,1,1,-1,1,1,1,0,1,1,1,0,1,-1,-1,1,1,0,0,1,1,0,0,-1,-1,1,1,0,0,1,1,0,0,1,-1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,-1,-1,1,1,0,0,1,1,1,-1,-1,-1,1,0,0,0,1,0,1,-1,1,-1,1,0,1,0,1,0,0,1,1,-1,1,1,1,0,1,1,0,1,-1,-1,1,1,0,0,1,1,1,-1,1,-1,1,0,1,0,1,0,0])},"20a2":function(e,n,t){e.exports=t("nOHt")},"8N3a":function(e,n,t){"use strict";n.a="[[block]] struct Uniforms {\n  modelViewProjectionMatrix : mat4x4<f32>;\n};\n[[binding(0), group(0)]] var<uniform> uniforms : Uniforms;\n\nstruct VertexOutput {\n  [[builtin(position)]] Position : vec4<f32>;\n  [[location(0)]] fragUV : vec2<f32>;\n  [[location(1)]] fragPosition: vec4<f32>;\n};\n\n[[stage(vertex)]]\nfn main([[location(0)]] position : vec4<f32>,\n        [[location(1)]] uv : vec2<f32>) -> VertexOutput {\n  var output : VertexOutput;\n  output.Position = uniforms.modelViewProjectionMatrix * position;\n  output.fragUV = uv;\n  output.fragPosition = 0.5 * (position + vec4<f32>(1.0, 1.0, 1.0, 1.0));\n  return output;\n}\n"},"8i9l":function(e,n,t){"use strict";t.d(n,"a",(function(){return b}));var r=t("nKUr"),a=t("rePB"),i=t("g4pe"),o=t.n(i),s=t("20a2"),c=t("q1tI"),u=t("hIuh"),f=t.n(u);function l(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function d(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?l(Object(t),!0).forEach((function(n){Object(a.a)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var p="undefined"!==typeof GPUDevice&&t("7QzT").setShaderRegisteredCallback;t("+dQi");var m=function(e){var n=Object(c.useRef)(null),a=Object(c.useMemo)((function(){return e.sources.map((function(e){return d({name:e.name},function(e,n){var a,i={lineNumbers:!0,lineWrapping:!0,theme:"monokai",readOnly:!n},o=null,s=[];o=document.createElement("div");var c=t("VrN/");return(a=c(o,i)).updatedSource=function(e){s.forEach((function(n){return n(e)}))},{updateCallbacks:s,Container:function(t){return Object(r.jsxs)("div",d(d({},t),{},{children:[n?Object(r.jsx)("button",{className:f.a.updateSourceBtn,onClick:function(){a.updatedSource(a.getValue())},children:"Update"}):null,Object(r.jsx)("div",{ref:function(n){o&&n&&(n.appendChild(o),a.setOption("value",e))}})]}))}}}(e.contents,e.editable))}))}),e.sources),i=Object(c.useRef)(null),u=Object(c.useMemo)((function(){if(e.gui)return new(t("iZKT").GUI)({autoPlace:!1})}),[]),l=Object(s.useRouter)().asPath.match(/#([a-zA-Z0-9\.\/]+)/),m=Object(c.useState)(null),b=m[0],x=m[1],h=Object(c.useState)(null),g=h[0],v=h[1];return Object(c.useEffect)((function(){v(l?l[1]:a[0].name),u&&i.current&&i.current.appendChild(u.domElement);try{var t=e.init({canvasRef:n,gui:u});t instanceof Promise&&t.catch((function(e){console.error(e),x(e)}))}catch(r){console.error(r),x(r)}}),[]),Object(c.useEffect)((function(){p&&p((function(n,t){var r=e.sources.findIndex((function(e){return e.contents==n}));a[r].updateCallbacks.push(t)}))}),[a]),Object(r.jsxs)("main",{children:[Object(r.jsxs)(o.a,{children:[Object(r.jsx)("style",{dangerouslySetInnerHTML:{__html:"\n            .CodeMirror {\n              height: auto !important;\n              margin: 1em 0;\n            }\n\n            .CodeMirror-scroll {\n              height: auto !important;\n              overflow: visible !important;\n            }\n          "}}),Object(r.jsx)("title",{children:"".concat(e.name," - WebGPU Samples")}),Object(r.jsx)("meta",{name:"description",content:e.description})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("h1",{children:e.name}),Object(r.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/austinEng/webgpu-samples/tree/main/".concat(e.filename),children:"See it on Github!"}),Object(r.jsx)("p",{children:e.description}),b?Object(r.jsxs)(r.Fragment,{children:[Object(r.jsx)("p",{children:"Is WebGPU Enabled?"}),Object(r.jsx)("p",{children:"".concat(b)})]}):null]}),Object(r.jsxs)("div",{className:f.a.canvasContainer,children:[Object(r.jsx)("div",{style:{position:"absolute",right:10},ref:i}),Object(r.jsx)("canvas",{ref:n,width:600,height:600})]}),Object(r.jsxs)("div",{children:[Object(r.jsx)("nav",{className:f.a.sourceFileNav,children:Object(r.jsx)("ul",{children:a.map((function(e,n){return Object(r.jsx)("li",{children:Object(r.jsx)("a",{href:"#".concat(e.name),"data-active":g==e.name,onClick:function(){v(e.name)},children:e.name})},n)}))})}),a.map((function(e,n){return Object(r.jsx)(e.Container,{className:f.a.sourceFileContainer,"data-active":g==e.name},n)}))]})]})},b=function(e){return Object(r.jsx)(m,d({},e))}},MYnn:function(e,n,t){"use strict";t.r(n),n.default="export const cubeVertexSize = 4 * 10; // Byte size of one cube vertex.\nexport const cubePositionOffset = 0;\nexport const cubeColorOffset = 4 * 4; // Byte offset of cube vertex color attribute.\nexport const cubeUVOffset = 4 * 8;\nexport const cubeVertexCount = 36;\n\n// prettier-ignore\nexport const cubeVertexArray = new Float32Array([\n  // float4 position, float4 color, float2 uv,\n  1, -1, 1, 1,   1, 0, 1, 1,  1, 1,\n  -1, -1, 1, 1,  0, 0, 1, 1,  0, 1,\n  -1, -1, -1, 1, 0, 0, 0, 1,  0, 0,\n  1, -1, -1, 1,  1, 0, 0, 1,  1, 0,\n  1, -1, 1, 1,   1, 0, 1, 1,  1, 1,\n  -1, -1, -1, 1, 0, 0, 0, 1,  0, 0,\n\n  1, 1, 1, 1,    1, 1, 1, 1,  1, 1,\n  1, -1, 1, 1,   1, 0, 1, 1,  0, 1,\n  1, -1, -1, 1,  1, 0, 0, 1,  0, 0,\n  1, 1, -1, 1,   1, 1, 0, 1,  1, 0,\n  1, 1, 1, 1,    1, 1, 1, 1,  1, 1,\n  1, -1, -1, 1,  1, 0, 0, 1,  0, 0,\n\n  -1, 1, 1, 1,   0, 1, 1, 1,  1, 1,\n  1, 1, 1, 1,    1, 1, 1, 1,  0, 1,\n  1, 1, -1, 1,   1, 1, 0, 1,  0, 0,\n  -1, 1, -1, 1,  0, 1, 0, 1,  1, 0,\n  -1, 1, 1, 1,   0, 1, 1, 1,  1, 1,\n  1, 1, -1, 1,   1, 1, 0, 1,  0, 0,\n\n  -1, -1, 1, 1,  0, 0, 1, 1,  1, 1,\n  -1, 1, 1, 1,   0, 1, 1, 1,  0, 1,\n  -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,\n  -1, -1, -1, 1, 0, 0, 0, 1,  1, 0,\n  -1, -1, 1, 1,  0, 0, 1, 1,  1, 1,\n  -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,\n\n  1, 1, 1, 1,    1, 1, 1, 1,  1, 1,\n  -1, 1, 1, 1,   0, 1, 1, 1,  0, 1,\n  -1, -1, 1, 1,  0, 0, 1, 1,  0, 0,\n  -1, -1, 1, 1,  0, 0, 1, 1,  0, 0,\n  1, -1, 1, 1,   1, 0, 1, 1,  1, 0,\n  1, 1, 1, 1,    1, 1, 1, 1,  1, 1,\n\n  1, -1, -1, 1,  1, 0, 0, 1,  1, 1,\n  -1, -1, -1, 1, 0, 0, 0, 1,  0, 1,\n  -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,\n  1, 1, -1, 1,   1, 1, 0, 1,  1, 0,\n  1, -1, -1, 1,  1, 0, 0, 1,  1, 1,\n  -1, 1, -1, 1,  0, 1, 0, 1,  0, 0,\n]);\n"},ZYMQ:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/samples/fractalCube",function(){return t("xsd4")}])},"b+lR":function(e,n,t){"use strict";n.a="[[binding(1), group(0)]] var mySampler: sampler;\n[[binding(2), group(0)]] var myTexture: texture_2d<f32>;\n\n[[stage(fragment)]]\nfn main([[location(0)]] fragUV: vec2<f32>,\n        [[location(1)]] fragPosition: vec4<f32>) -> [[location(0)]] vec4<f32> {\n  var texColor = textureSample(myTexture, mySampler, fragUV * 0.8 + vec2<f32>(0.1, 0.1));\n  var f : f32;\n  if (length(texColor.rgb - vec3<f32>(0.5, 0.5, 0.5)) < 0.01) {\n    f = 1.0;\n  } else {\n    f = 0.0;\n  }\n  return (1.0 - f) * texColor + f * fragPosition;\n}\n"},djvJ:function(e,n,t){"use strict";(function(e,r){var a=t("o0o1"),i=t.n(a),o=t("HaE+"),s=t("IOcx"),c=t("8i9l"),u=t("1uVF"),f=t("8N3a"),l=t("b+lR"),d=function(){var e=Object(o.a)(i.a.mark((function e(n){var t,r,a,o,c,d,p,m,b,x,h,g,v,w,O,j,P,S,y;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return y=function(){if(t.current){var e=S();a.queue.writeBuffer(h,0,e.buffer,e.byteOffset,e.byteLength);var n=o.getCurrentTexture();O.colorAttachments[0].view=n.createView();var r=a.createCommandEncoder(),i=r.beginRenderPass(O);i.setPipeline(b),i.setBindGroup(0,w),i.setVertexBuffer(0,m),i.draw(u.d,1,0,0),i.endPass(),r.copyTextureToTexture({texture:n},{texture:g},d),a.queue.submit([r.finish()]),requestAnimationFrame(y)}},S=function(){var e=s.a.create();s.a.translate(e,e,s.b.fromValues(0,0,-4));var n=Date.now()/1e3;s.a.rotate(e,e,1,s.b.fromValues(Math.sin(n),Math.cos(n),0));var t=s.a.create();return s.a.multiply(t,P,e),t},t=n.canvasRef,e.next=5,navigator.gpu.requestAdapter();case 5:return r=e.sent,e.next=8,r.requestDevice();case 8:if(a=e.sent,null!==t.current){e.next=11;break}return e.abrupt("return");case 11:o=t.current.getContext("webgpu"),c=window.devicePixelRatio||1,d=[t.current.clientWidth*c,t.current.clientHeight*c],p=o.getPreferredFormat(r),o.configure({device:a,format:p,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC,size:d}),m=a.createBuffer({size:u.c.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0}),new Float32Array(m.getMappedRange()).set(u.c),m.unmap(),b=a.createRenderPipeline({vertex:{module:a.createShaderModule({code:f.a}),entryPoint:"main",buffers:[{arrayStride:u.e,attributes:[{shaderLocation:0,offset:u.a,format:"float32x4"},{shaderLocation:1,offset:u.b,format:"float32x2"}]}]},fragment:{module:a.createShaderModule({code:l.a}),entryPoint:"main",targets:[{format:p}]},primitive:{topology:"triangle-list",cullMode:"back"},depthStencil:{depthWriteEnabled:!0,depthCompare:"less",format:"depth24plus"}}),x=a.createTexture({size:d,format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),64,h=a.createBuffer({size:64,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),g=a.createTexture({size:d,format:p,usage:GPUTextureUsage.SAMPLED|GPUTextureUsage.COPY_DST}),v=a.createSampler({magFilter:"linear",minFilter:"linear"}),w=a.createBindGroup({layout:b.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:h}},{binding:1,resource:v},{binding:2,resource:g.createView()}]}),O={colorAttachments:[{view:void 0,loadValue:{r:.5,g:.5,b:.5,a:1},storeOp:"store"}],depthStencilAttachment:{view:x.createView(),depthLoadValue:1,depthStoreOp:"store",stencilLoadValue:0,stencilStoreOp:"store"}},j=d[0]/d[1],P=s.a.create(),s.a.perspective(P,2*Math.PI/5,j,1,100),requestAnimationFrame(y);case 31:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();n.a=function(){return Object(c.a)({name:"Textured Cube",description:"This example uses the previous frame's rendering result        as the source texture for the next frame.",init:d,sources:[{name:e.substr(r.length+1),contents:"import { mat4, vec3 } from 'gl-matrix';\nimport { makeSample, SampleInit } from '../../components/SampleLayout';\n\nimport {\n  cubeVertexArray,\n  cubeVertexSize,\n  cubeUVOffset,\n  cubePositionOffset,\n  cubeVertexCount,\n} from '../../meshes/cube';\n\nimport basicVertWGSL from '../../shaders/basic.vert.wgsl';\nimport sampleSelfWGSL from './sampleSelf.frag.wgsl';\n\nconst init: SampleInit = async ({ canvasRef }) => {\n  const adapter = await navigator.gpu.requestAdapter();\n  const device = await adapter.requestDevice();\n\n  if (canvasRef.current === null) return;\n  const context = canvasRef.current.getContext('webgpu');\n\n  const devicePixelRatio = window.devicePixelRatio || 1;\n  const presentationSize = [\n    canvasRef.current.clientWidth * devicePixelRatio,\n    canvasRef.current.clientHeight * devicePixelRatio,\n  ];\n  const presentationFormat = context.getPreferredFormat(adapter);\n\n  context.configure({\n    device,\n    format: presentationFormat,\n\n    // Specify we want both RENDER_ATTACHMENT and COPY_SRC since we\n    // will copy out of the swapchain texture.\n    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.COPY_SRC,\n    size: presentationSize,\n  });\n\n  // Create a vertex buffer from the cube data.\n  const verticesBuffer = device.createBuffer({\n    size: cubeVertexArray.byteLength,\n    usage: GPUBufferUsage.VERTEX,\n    mappedAtCreation: true,\n  });\n  new Float32Array(verticesBuffer.getMappedRange()).set(cubeVertexArray);\n  verticesBuffer.unmap();\n\n  const pipeline = device.createRenderPipeline({\n    vertex: {\n      module: device.createShaderModule({\n        code: basicVertWGSL,\n      }),\n      entryPoint: 'main',\n      buffers: [\n        {\n          arrayStride: cubeVertexSize,\n          attributes: [\n            {\n              // position\n              shaderLocation: 0,\n              offset: cubePositionOffset,\n              format: 'float32x4',\n            },\n            {\n              // uv\n              shaderLocation: 1,\n              offset: cubeUVOffset,\n              format: 'float32x2',\n            },\n          ],\n        },\n      ],\n    },\n    fragment: {\n      module: device.createShaderModule({\n        code: sampleSelfWGSL,\n      }),\n      entryPoint: 'main',\n      targets: [\n        {\n          format: presentationFormat,\n        },\n      ],\n    },\n    primitive: {\n      topology: 'triangle-list',\n\n      // Backface culling since the cube is solid piece of geometry.\n      // Faces pointing away from the camera will be occluded by faces\n      // pointing toward the camera.\n      cullMode: 'back',\n    },\n\n    // Enable depth testing so that the fragment closest to the camera\n    // is rendered in front.\n    depthStencil: {\n      depthWriteEnabled: true,\n      depthCompare: 'less',\n      format: 'depth24plus',\n    },\n  });\n\n  const depthTexture = device.createTexture({\n    size: presentationSize,\n    format: 'depth24plus',\n    usage: GPUTextureUsage.RENDER_ATTACHMENT,\n  });\n\n  const uniformBufferSize = 4 * 16; // 4x4 matrix\n  const uniformBuffer = device.createBuffer({\n    size: uniformBufferSize,\n    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,\n  });\n\n  // We will copy the frame's rendering results into this texture and\n  // sample it on the next frame.\n  const cubeTexture = device.createTexture({\n    size: presentationSize,\n    format: presentationFormat,\n    usage: GPUTextureUsage.SAMPLED | GPUTextureUsage.COPY_DST,\n  });\n\n  // Create a sampler with linear filtering for smooth interpolation.\n  const sampler = device.createSampler({\n    magFilter: 'linear',\n    minFilter: 'linear',\n  });\n\n  const uniformBindGroup = device.createBindGroup({\n    layout: pipeline.getBindGroupLayout(0),\n    entries: [\n      {\n        binding: 0,\n        resource: {\n          buffer: uniformBuffer,\n        },\n      },\n      {\n        binding: 1,\n        resource: sampler,\n      },\n      {\n        binding: 2,\n        resource: cubeTexture.createView(),\n      },\n    ],\n  });\n\n  const renderPassDescriptor: GPURenderPassDescriptor = {\n    colorAttachments: [\n      {\n        view: undefined, // Assigned later\n\n        loadValue: { r: 0.5, g: 0.5, b: 0.5, a: 1.0 },\n        storeOp: 'store',\n      },\n    ],\n    depthStencilAttachment: {\n      view: depthTexture.createView(),\n\n      depthLoadValue: 1.0,\n      depthStoreOp: 'store',\n      stencilLoadValue: 0,\n      stencilStoreOp: 'store',\n    },\n  };\n\n  const aspect = presentationSize[0] / presentationSize[1];\n  const projectionMatrix = mat4.create();\n  mat4.perspective(projectionMatrix, (2 * Math.PI) / 5, aspect, 1, 100.0);\n\n  function getTransformationMatrix() {\n    const viewMatrix = mat4.create();\n    mat4.translate(viewMatrix, viewMatrix, vec3.fromValues(0, 0, -4));\n    const now = Date.now() / 1000;\n    mat4.rotate(\n      viewMatrix,\n      viewMatrix,\n      1,\n      vec3.fromValues(Math.sin(now), Math.cos(now), 0)\n    );\n\n    const modelViewProjectionMatrix = mat4.create();\n    mat4.multiply(modelViewProjectionMatrix, projectionMatrix, viewMatrix);\n\n    return modelViewProjectionMatrix as Float32Array;\n  }\n\n  function frame() {\n    // Sample is no longer the active page.\n    if (!canvasRef.current) return;\n\n    const transformationMatrix = getTransformationMatrix();\n    device.queue.writeBuffer(\n      uniformBuffer,\n      0,\n      transformationMatrix.buffer,\n      transformationMatrix.byteOffset,\n      transformationMatrix.byteLength\n    );\n\n    const swapChainTexture = context.getCurrentTexture();\n    renderPassDescriptor.colorAttachments[0].view = swapChainTexture.createView();\n\n    const commandEncoder = device.createCommandEncoder();\n    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);\n    passEncoder.setPipeline(pipeline);\n    passEncoder.setBindGroup(0, uniformBindGroup);\n    passEncoder.setVertexBuffer(0, verticesBuffer);\n    passEncoder.draw(cubeVertexCount, 1, 0, 0);\n    passEncoder.endPass();\n\n    // Copy the rendering results from the swapchain into |cubeTexture|.\n    commandEncoder.copyTextureToTexture(\n      {\n        texture: swapChainTexture,\n      },\n      {\n        texture: cubeTexture,\n      },\n      presentationSize\n    );\n\n    device.queue.submit([commandEncoder.finish()]);\n\n    requestAnimationFrame(frame);\n  }\n  requestAnimationFrame(frame);\n};\n\nconst TexturedCube: () => JSX.Element = () =>\n  makeSample({\n    name: 'Textured Cube',\n    description:\n      \"This example uses the previous frame's rendering result \\\n       as the source texture for the next frame.\",\n    init,\n    sources: [\n      {\n        name: __filename.substr(__dirname.length + 1),\n        contents: __SOURCE__,\n      },\n      {\n        name: '../../shaders/basic.vert.wgsl',\n        contents: basicVertWGSL,\n        editable: true,\n      },\n      {\n        name: './sampleSelf.frag.wgsl',\n        contents: sampleSelfWGSL,\n        editable: true,\n      },\n      {\n        name: '../../meshes/cube.ts',\n        // eslint-disable-next-line @typescript-eslint/no-var-requires\n        contents: require('!!raw-loader!../../meshes/cube.ts').default,\n      },\n    ],\n    filename: __filename,\n  });\n\nexport default TexturedCube;\n"},{name:"../../shaders/basic.vert.wgsl",contents:f.a,editable:!0},{name:"./sampleSelf.frag.wgsl",contents:l.a,editable:!0},{name:"../../meshes/cube.ts",contents:t("MYnn").default}],filename:e})}}).call(this,"src/sample/fractalCube/main.ts","src/sample/fractalCube")},hIuh:function(e,n,t){e.exports={canvasContainer:"SampleLayout_canvasContainer__1qkqt",sourceFileNav:"SampleLayout_sourceFileNav__2aMxK",sourceFileContainer:"SampleLayout_sourceFileContainer__3iiDM",updateSourceBtn:"SampleLayout_updateSourceBtn__3lOwr"}},xsd4:function(e,n,t){"use strict";t.r(n);var r=t("djvJ");n.default=r.a}},[["ZYMQ",0,1,4,2,3,5,6]]]);