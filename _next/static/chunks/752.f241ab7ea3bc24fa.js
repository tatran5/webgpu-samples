(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[752],{5671:function(e,n,t){"use strict";t.d(n,{T:function(){return d}});var a=t(5893),r=t(9008),i=t.n(r),s=t(1163),o=t(7294),c=t(9147),l=t.n(c);let u="undefined"!=typeof GPUDevice&&t(6257).setShaderRegisteredCallback;t(7319);let p=e=>{let n=(0,o.useRef)(null),r=(0,o.useMemo)(()=>e.sources.map(e=>{let{name:n,contents:r,editable:i}=e;return{name:n,...function(e,n){let r;let i=null,s=[];{i=document.createElement("div");let o=t(4631);(r=o(i,{lineNumbers:!0,lineWrapping:!0,theme:"monokai",readOnly:!n})).updatedSource=function(e){s.forEach(n=>n(e))}}return{updateCallbacks:s,Container:function(t){return(0,a.jsxs)("div",{...t,children:[n?(0,a.jsx)("button",{className:l().updateSourceBtn,onClick(){r.updatedSource(r.getValue())},children:"Update"}):null,(0,a.jsx)("div",{ref(n){i&&n&&(n.appendChild(i),r.setOption("value",e))}})]})}}}(r,i)}}),e.sources),c=(0,o.useRef)(null),p=(0,o.useMemo)(()=>{if(e.gui){let n=t(4376);return new n.GUI({autoPlace:!1})}},[]),d=(0,s.useRouter)(),f=d.asPath.match(/#([a-zA-Z0-9\.\/]+)/),[m,v]=(0,o.useState)(null),[g,h]=(0,o.useState)(null);return(0,o.useEffect)(()=>{f?h(f[1]):h(r[0].name),p&&c.current&&c.current.appendChild(p.domElement);let t={active:!0},a=()=>{t.active=!1};try{let i=n.current,s=e.init({canvas:i,pageState:t,gui:p});s instanceof Promise&&s.catch(e=>{console.error(e),v(e)})}catch(o){console.error(o),v(o)}return a},[]),(0,o.useEffect)(()=>{u&&u((n,t)=>{let a=e.sources.findIndex(e=>{let{contents:t}=e;return t==n});r[a].updateCallbacks.push(t)})},[r]),(0,a.jsxs)("main",{children:[(0,a.jsxs)(i(),{children:[(0,a.jsx)("style",{dangerouslySetInnerHTML:{__html:"\n            .CodeMirror {\n              height: auto !important;\n              margin: 1em 0;\n            }\n\n            .CodeMirror-scroll {\n              height: auto !important;\n              overflow: visible !important;\n            }\n          "}}),(0,a.jsx)("title",{children:"".concat(e.name," - WebGPU Samples")}),(0,a.jsx)("meta",{name:"description",content:e.description})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("h1",{children:e.name}),(0,a.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/austinEng/webgpu-samples/tree/main/".concat(e.filename),children:"See it on Github!"}),(0,a.jsx)("p",{children:e.description}),m?(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("p",{children:"Is WebGPU Enabled?"}),(0,a.jsx)("p",{children:"".concat(m)})]}):null]}),(0,a.jsxs)("div",{className:l().canvasContainer,children:[(0,a.jsx)("div",{style:{position:"absolute",right:10},ref:c}),(0,a.jsx)("canvas",{ref:n,width:600,height:600})]}),(0,a.jsxs)("div",{children:[(0,a.jsx)("nav",{className:l().sourceFileNav,children:(0,a.jsx)("ul",{children:r.map((e,n)=>(0,a.jsx)("li",{children:(0,a.jsx)("a",{href:"#".concat(e.name),"data-active":g==e.name,onClick(){h(e.name)},children:e.name})},n))})}),r.map((e,n)=>(0,a.jsx)(e.Container,{className:l().sourceFileContainer,"data-active":g==e.name},n))]})]})},d=e=>(0,a.jsx)(p,{...e})},2752:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return l}});var a=t(5671),r="@vertex\nfn vert_main(\n  @location(0) a_particlePos : vec2f,\n  @location(1) a_particleVel : vec2f,\n  @location(2) a_pos : vec2f\n) -> @builtin(position) vec4f {\n  let angle = -atan2(a_particleVel.x, a_particleVel.y);\n  let pos = a_pos * mat2x2(cos(angle), -sin(angle), sin(angle), cos(angle));\n  return vec4(pos + a_particlePos, 0, 1);\n}\n\n@fragment\nfn frag_main() -> @location(0) vec4f {\n  return vec4(1);\n}\n",i="struct Particle {\n  pos : vec2f,\n  vel : vec2f,\n}\nstruct SimParams {\n  deltaT : f32,\n  rule1Distance : f32,\n  rule2Distance : f32,\n  rule3Distance : f32,\n  rule1Scale : f32,\n  rule2Scale : f32,\n  rule3Scale : f32,\n}\nstruct Particles {\n  particles : array<Particle>,\n}\n@binding(0) @group(0) var<uniform> params : SimParams;\n@binding(1) @group(0) var<storage, read> particlesA : Particles;\n@binding(2) @group(0) var<storage, read_write> particlesB : Particles;\n\n// https://github.com/austinEng/Project6-Vulkan-Flocking/blob/master/data/shaders/computeparticles/particle.comp\n@compute @workgroup_size(64)\nfn main(@builtin(global_invocation_id) GlobalInvocationID : vec3u) {\n  var index = GlobalInvocationID.x;\n\n  var vPos = particlesA.particles[index].pos;\n  var vVel = particlesA.particles[index].vel;\n  var cMass = vec2f();\n  var cVel = vec2f();\n  var colVel = vec2f();\n  var cMassCount = 0u;\n  var cVelCount = 0u;\n\n  for (var i = 0u; i < arrayLength(&particlesA.particles); i++) {\n    if (i == index) {\n      continue;\n    }\n\n    let pos = particlesA.particles[i].pos.xy;\n    let vel = particlesA.particles[i].vel.xy;\n    if (distance(pos, vPos) < params.rule1Distance) {\n      cMass += pos;\n      cMassCount++;\n    }\n    if (distance(pos, vPos) < params.rule2Distance) {\n      colVel -= pos - vPos;\n    }\n    if (distance(pos, vPos) < params.rule3Distance) {\n      cVel += vel;\n      cVelCount++;\n    }\n  }\n\n  if (cMassCount > 0) {\n    cMass = (cMass / vec2(f32(cMassCount))) - vPos;\n  }\n  if (cVelCount > 0) {\n    cVel /= f32(cVelCount);\n  }\n  vVel += (cMass * params.rule1Scale) + (colVel * params.rule2Scale) + (cVel * params.rule3Scale);\n\n  // clamp velocity for a more pleasing simulation\n  vVel = normalize(vVel) * clamp(length(vVel), 0, 0.1);\n  // kinematic update\n  vPos += vVel * params.deltaT;\n  // Wrap around boundary\n  vPos = select(vPos, vec2(1), vPos < vec2(-1));\n  vPos = select(vPos, vec2(-1), vPos > vec2(1));\n  // Write back\n  particlesB.particles[index].pos = vPos;\n  particlesB.particles[index].vel = vVel;\n}\n",s="src/sample/computeBoids/main.ts";let o=async e=>{let{canvas:n,pageState:t,gui:a}=e,s=await navigator.gpu.requestAdapter(),o=await s.requestDevice();if(!t.active)return;let c=n.getContext("webgpu"),l=window.devicePixelRatio||1,u=[n.clientWidth*l,n.clientHeight*l],p=navigator.gpu.getPreferredCanvasFormat();c.configure({device:o,size:u,format:p,alphaMode:"opaque"});let d=o.createShaderModule({code:r}),f=o.createRenderPipeline({layout:"auto",vertex:{module:d,entryPoint:"vert_main",buffers:[{arrayStride:16,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32x2"},{shaderLocation:1,offset:8,format:"float32x2"}]},{arrayStride:8,stepMode:"vertex",attributes:[{shaderLocation:2,offset:0,format:"float32x2"}]}]},fragment:{module:d,entryPoint:"frag_main",targets:[{format:p}]},primitive:{topology:"triangle-list"}}),m=o.createComputePipeline({layout:"auto",compute:{module:o.createShaderModule({code:i}),entryPoint:"main"}}),v={colorAttachments:[{view:void 0,clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"}]},g=new Float32Array([-.01,-.02,.01,-.02,0,.02]),h=o.createBuffer({size:g.byteLength,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0});new Float32Array(h.getMappedRange()).set(g),h.unmap();let P={deltaT:.04,rule1Distance:.1,rule2Distance:.025,rule3Distance:.025,rule1Scale:.02,rule2Scale:.05,rule3Scale:.005},S=7*Float32Array.BYTES_PER_ELEMENT,b=o.createBuffer({size:S,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});function x(){o.queue.writeBuffer(b,0,new Float32Array([P.deltaT,P.rule1Distance,P.rule2Distance,P.rule3Distance,P.rule1Scale,P.rule2Scale,P.rule3Scale]))}x(),Object.keys(P).forEach(e=>{a.add(P,e).onFinishChange(x)});let y=new Float32Array(6e3);for(let B=0;B<1500;++B)y[4*B+0]=2*(Math.random()-.5),y[4*B+1]=2*(Math.random()-.5),y[4*B+2]=2*(Math.random()-.5)*.1,y[4*B+3]=2*(Math.random()-.5)*.1;let C=[,,],_=[,,];for(let w=0;w<2;++w)C[w]=o.createBuffer({size:y.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.STORAGE,mappedAtCreation:!0}),new Float32Array(C[w].getMappedRange()).set(y),C[w].unmap();for(let E=0;E<2;++E)_[E]=o.createBindGroup({layout:m.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:b}},{binding:1,resource:{buffer:C[E],offset:0,size:y.byteLength}},{binding:2,resource:{buffer:C[(E+1)%2],offset:0,size:y.byteLength}}]});let M=0;requestAnimationFrame(function e(){if(!t.active)return;v.colorAttachments[0].view=c.getCurrentTexture().createView();let n=o.createCommandEncoder();{let a=n.beginComputePass();a.setPipeline(m),a.setBindGroup(0,_[M%2]),a.dispatchWorkgroups(Math.ceil(23.4375)),a.end()}{let r=n.beginRenderPass(v);r.setPipeline(f),r.setVertexBuffer(0,C[(M+1)%2]),r.setVertexBuffer(1,h),r.draw(3,1500,0,0),r.end()}o.queue.submit([n.finish()]),++M,requestAnimationFrame(e)})},c=()=>(0,a.T)({name:"Compute Boids",description:"A GPU compute particle simulation that mimics the flocking behavior of birds. A compute shader updates two ping-pong buffers which store particle data. The data is used to draw instanced particles.",gui:!0,init:o,sources:[{name:s.substring(24),contents:"import { makeSample, SampleInit } from '../../components/SampleLayout';\n\nimport spriteWGSL from './sprite.wgsl';\nimport updateSpritesWGSL from './updateSprites.wgsl';\n\nconst init: SampleInit = async ({ canvas, pageState, gui }) => {\n  const adapter = await navigator.gpu.requestAdapter();\n  const device = await adapter.requestDevice();\n\n  if (!pageState.active) return;\n  const context = canvas.getContext('webgpu') as GPUCanvasContext;\n  const devicePixelRatio = window.devicePixelRatio || 1;\n  const presentationSize = [\n    canvas.clientWidth * devicePixelRatio,\n    canvas.clientHeight * devicePixelRatio,\n  ];\n  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();\n\n  context.configure({\n    device,\n    size: presentationSize,\n    format: presentationFormat,\n    alphaMode: 'opaque',\n  });\n\n  const spriteShaderModule = device.createShaderModule({ code: spriteWGSL });\n  const renderPipeline = device.createRenderPipeline({\n    layout: 'auto',\n    vertex: {\n      module: spriteShaderModule,\n      entryPoint: 'vert_main',\n      buffers: [\n        {\n          // instanced particles buffer\n          arrayStride: 4 * 4,\n          stepMode: 'instance',\n          attributes: [\n            {\n              // instance position\n              shaderLocation: 0,\n              offset: 0,\n              format: 'float32x2',\n            },\n            {\n              // instance velocity\n              shaderLocation: 1,\n              offset: 2 * 4,\n              format: 'float32x2',\n            },\n          ],\n        },\n        {\n          // vertex buffer\n          arrayStride: 2 * 4,\n          stepMode: 'vertex',\n          attributes: [\n            {\n              // vertex positions\n              shaderLocation: 2,\n              offset: 0,\n              format: 'float32x2',\n            },\n          ],\n        },\n      ],\n    },\n    fragment: {\n      module: spriteShaderModule,\n      entryPoint: 'frag_main',\n      targets: [\n        {\n          format: presentationFormat,\n        },\n      ],\n    },\n    primitive: {\n      topology: 'triangle-list',\n    },\n  });\n\n  const computePipeline = device.createComputePipeline({\n    layout: 'auto',\n    compute: {\n      module: device.createShaderModule({\n        code: updateSpritesWGSL,\n      }),\n      entryPoint: 'main',\n    },\n  });\n\n  const renderPassDescriptor: GPURenderPassDescriptor = {\n    colorAttachments: [\n      {\n        view: undefined, // Assigned later\n        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },\n        loadOp: 'clear',\n        storeOp: 'store',\n      },\n    ],\n  };\n\n  // prettier-ignore\n  const vertexBufferData = new Float32Array([\n    -0.01, -0.02, 0.01,\n    -0.02, 0.0, 0.02,\n  ]);\n\n  const spriteVertexBuffer = device.createBuffer({\n    size: vertexBufferData.byteLength,\n    usage: GPUBufferUsage.VERTEX,\n    mappedAtCreation: true,\n  });\n  new Float32Array(spriteVertexBuffer.getMappedRange()).set(vertexBufferData);\n  spriteVertexBuffer.unmap();\n\n  const simParams = {\n    deltaT: 0.04,\n    rule1Distance: 0.1,\n    rule2Distance: 0.025,\n    rule3Distance: 0.025,\n    rule1Scale: 0.02,\n    rule2Scale: 0.05,\n    rule3Scale: 0.005,\n  };\n\n  const simParamBufferSize = 7 * Float32Array.BYTES_PER_ELEMENT;\n  const simParamBuffer = device.createBuffer({\n    size: simParamBufferSize,\n    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,\n  });\n\n  function updateSimParams() {\n    device.queue.writeBuffer(\n      simParamBuffer,\n      0,\n      new Float32Array([\n        simParams.deltaT,\n        simParams.rule1Distance,\n        simParams.rule2Distance,\n        simParams.rule3Distance,\n        simParams.rule1Scale,\n        simParams.rule2Scale,\n        simParams.rule3Scale,\n      ])\n    );\n  }\n\n  updateSimParams();\n  Object.keys(simParams).forEach((k) => {\n    gui.add(simParams, k).onFinishChange(updateSimParams);\n  });\n\n  const numParticles = 1500;\n  const initialParticleData = new Float32Array(numParticles * 4);\n  for (let i = 0; i < numParticles; ++i) {\n    initialParticleData[4 * i + 0] = 2 * (Math.random() - 0.5);\n    initialParticleData[4 * i + 1] = 2 * (Math.random() - 0.5);\n    initialParticleData[4 * i + 2] = 2 * (Math.random() - 0.5) * 0.1;\n    initialParticleData[4 * i + 3] = 2 * (Math.random() - 0.5) * 0.1;\n  }\n\n  const particleBuffers: GPUBuffer[] = new Array(2);\n  const particleBindGroups: GPUBindGroup[] = new Array(2);\n  for (let i = 0; i < 2; ++i) {\n    particleBuffers[i] = device.createBuffer({\n      size: initialParticleData.byteLength,\n      usage: GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE,\n      mappedAtCreation: true,\n    });\n    new Float32Array(particleBuffers[i].getMappedRange()).set(\n      initialParticleData\n    );\n    particleBuffers[i].unmap();\n  }\n\n  for (let i = 0; i < 2; ++i) {\n    particleBindGroups[i] = device.createBindGroup({\n      layout: computePipeline.getBindGroupLayout(0),\n      entries: [\n        {\n          binding: 0,\n          resource: {\n            buffer: simParamBuffer,\n          },\n        },\n        {\n          binding: 1,\n          resource: {\n            buffer: particleBuffers[i],\n            offset: 0,\n            size: initialParticleData.byteLength,\n          },\n        },\n        {\n          binding: 2,\n          resource: {\n            buffer: particleBuffers[(i + 1) % 2],\n            offset: 0,\n            size: initialParticleData.byteLength,\n          },\n        },\n      ],\n    });\n  }\n\n  let t = 0;\n  function frame() {\n    // Sample is no longer the active page.\n    if (!pageState.active) return;\n\n    renderPassDescriptor.colorAttachments[0].view = context\n      .getCurrentTexture()\n      .createView();\n\n    const commandEncoder = device.createCommandEncoder();\n    {\n      const passEncoder = commandEncoder.beginComputePass();\n      passEncoder.setPipeline(computePipeline);\n      passEncoder.setBindGroup(0, particleBindGroups[t % 2]);\n      passEncoder.dispatchWorkgroups(Math.ceil(numParticles / 64));\n      passEncoder.end();\n    }\n    {\n      const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);\n      passEncoder.setPipeline(renderPipeline);\n      passEncoder.setVertexBuffer(0, particleBuffers[(t + 1) % 2]);\n      passEncoder.setVertexBuffer(1, spriteVertexBuffer);\n      passEncoder.draw(3, numParticles, 0, 0);\n      passEncoder.end();\n    }\n    device.queue.submit([commandEncoder.finish()]);\n\n    ++t;\n    requestAnimationFrame(frame);\n  }\n  requestAnimationFrame(frame);\n};\n\nconst ComputeBoids: () => JSX.Element = () =>\n  makeSample({\n    name: 'Compute Boids',\n    description:\n      'A GPU compute particle simulation that mimics \\\nthe flocking behavior of birds. A compute shader updates \\\ntwo ping-pong buffers which store particle data. The data \\\nis used to draw instanced particles.',\n    gui: true,\n    init,\n    sources: [\n      {\n        name: __filename.substring(__dirname.length + 1),\n        contents: __SOURCE__,\n      },\n      {\n        name: 'updateSprites.wgsl',\n        contents: updateSpritesWGSL,\n        editable: true,\n      },\n      {\n        name: 'sprite.wgsl',\n        contents: spriteWGSL,\n        editable: true,\n      },\n    ],\n    filename: __filename,\n  });\n\nexport default ComputeBoids;\n"},{name:"updateSprites.wgsl",contents:i,editable:!0},{name:"sprite.wgsl",contents:r,editable:!0}],filename:s});var l=c},9147:function(e){e.exports={canvasContainer:"SampleLayout_canvasContainer__zRR_l",sourceFileNav:"SampleLayout_sourceFileNav__ml48P",sourceFileContainer:"SampleLayout_sourceFileContainer__3s84x",updateSourceBtn:"SampleLayout_updateSourceBtn__L2sFc"}}}]);