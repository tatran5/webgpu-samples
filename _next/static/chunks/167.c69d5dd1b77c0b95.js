(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[167],{5671:function(e,n,t){"use strict";t.d(n,{T:function(){return p}});var r=t(5893),a=t(9008),i=t.n(a),o=t(1163),s=t(7294),u=t(9147),c=t.n(u);let l="undefined"!=typeof GPUDevice&&t(6257).setShaderRegisteredCallback;t(7319);let d=e=>{let n=(0,s.useRef)(null),a=(0,s.useMemo)(()=>e.sources.map(e=>{let{name:n,contents:a,editable:i}=e;return{name:n,...function(e,n){let a;let i=null,o=[];{i=document.createElement("div");let s=t(4631);(a=s(i,{lineNumbers:!0,lineWrapping:!0,theme:"monokai",readOnly:!n})).updatedSource=function(e){o.forEach(n=>n(e))}}return{updateCallbacks:o,Container:function(t){return(0,r.jsxs)("div",{...t,children:[n?(0,r.jsx)("button",{className:c().updateSourceBtn,onClick(){a.updatedSource(a.getValue())},children:"Update"}):null,(0,r.jsx)("div",{ref(n){i&&n&&(n.appendChild(i),a.setOption("value",e))}})]})}}}(a,i)}}),e.sources),u=(0,s.useRef)(null),d=(0,s.useMemo)(()=>{if(e.gui){let n=t(4376);return new n.GUI({autoPlace:!1})}},[]),p=(0,o.useRouter)(),m=p.asPath.match(/#([a-zA-Z0-9\.\/]+)/),[f,g]=(0,s.useState)(null),[v,h]=(0,s.useState)(null);return(0,s.useEffect)(()=>{m?h(m[1]):h(a[0].name),d&&u.current&&u.current.appendChild(d.domElement);let t={active:!0},r=()=>{t.active=!1};try{let i=n.current,o=e.init({canvas:i,pageState:t,gui:d});o instanceof Promise&&o.catch(e=>{console.error(e),g(e)})}catch(s){console.error(s),g(s)}return r},[]),(0,s.useEffect)(()=>{l&&l((n,t)=>{let r=e.sources.findIndex(e=>{let{contents:t}=e;return t==n});a[r].updateCallbacks.push(t)})},[a]),(0,r.jsxs)("main",{children:[(0,r.jsxs)(i(),{children:[(0,r.jsx)("style",{dangerouslySetInnerHTML:{__html:"\n            .CodeMirror {\n              height: auto !important;\n              margin: 1em 0;\n            }\n\n            .CodeMirror-scroll {\n              height: auto !important;\n              overflow: visible !important;\n            }\n          "}}),(0,r.jsx)("title",{children:"".concat(e.name," - WebGPU Samples")}),(0,r.jsx)("meta",{name:"description",content:e.description})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("h1",{children:e.name}),(0,r.jsx)("a",{target:"_blank",rel:"noreferrer",href:"https://github.com/austinEng/webgpu-samples/tree/main/".concat(e.filename),children:"See it on Github!"}),(0,r.jsx)("p",{children:e.description}),f?(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)("p",{children:"Is WebGPU Enabled?"}),(0,r.jsx)("p",{children:"".concat(f)})]}):null]}),(0,r.jsxs)("div",{className:c().canvasContainer,children:[(0,r.jsx)("div",{style:{position:"absolute",right:10},ref:u}),(0,r.jsx)("canvas",{ref:n,width:600,height:600})]}),(0,r.jsxs)("div",{children:[(0,r.jsx)("nav",{className:c().sourceFileNav,children:(0,r.jsx)("ul",{children:a.map((e,n)=>(0,r.jsx)("li",{children:(0,r.jsx)("a",{href:"#".concat(e.name),"data-active":v==e.name,onClick(){h(e.name)},children:e.name})},n))})}),a.map((e,n)=>(0,r.jsx)(e.Container,{className:c().sourceFileContainer,"data-active":v==e.name},n))]})]})},p=e=>(0,r.jsx)(d,{...e})},6167:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return d}});var r=t(5975),a=t(7160),i=t(5671),o="////////////////////////////////////////////////////////////////////////////////\n// Utilities\n////////////////////////////////////////////////////////////////////////////////\nvar<private> rand_seed : vec2f;\n\nfn rand() -> f32 {\n  rand_seed.x = fract(cos(dot(rand_seed, vec2f(23.14077926, 232.61690225))) * 136.8168);\n  rand_seed.y = fract(cos(dot(rand_seed, vec2f(54.47856553, 345.84153136))) * 534.7645);\n  return rand_seed.y;\n}\n\n////////////////////////////////////////////////////////////////////////////////\n// Vertex shader\n////////////////////////////////////////////////////////////////////////////////\nstruct RenderParams {\n  modelViewProjectionMatrix : mat4x4<f32>,\n  right : vec3f,\n  up : vec3f\n}\n@binding(0) @group(0) var<uniform> render_params : RenderParams;\n\nstruct VertexInput {\n  @location(0) position : vec3f,\n  @location(1) color : vec4f,\n  @location(2) quad_pos : vec2f, // -1..+1\n}\n\nstruct VertexOutput {\n  @builtin(position) position : vec4f,\n  @location(0) color : vec4f,\n  @location(1) quad_pos : vec2f, // -1..+1\n}\n\n@vertex\nfn vs_main(in : VertexInput) -> VertexOutput {\n  var quad_pos = mat2x3<f32>(render_params.right, render_params.up) * in.quad_pos;\n  var position = in.position + quad_pos * 0.01;\n  var out : VertexOutput;\n  out.position = render_params.modelViewProjectionMatrix * vec4f(position, 1.0);\n  out.color = in.color;\n  out.quad_pos = in.quad_pos;\n  return out;\n}\n\n////////////////////////////////////////////////////////////////////////////////\n// Fragment shader\n////////////////////////////////////////////////////////////////////////////////\n@fragment\nfn fs_main(in : VertexOutput) -> @location(0) vec4f {\n  var color = in.color;\n  // Apply a circular particle alpha mask\n  color.a = color.a * max(1 - length(in.quad_pos), 0);\n  return color;\n}\n\n////////////////////////////////////////////////////////////////////////////////\n// Simulation Compute shader\n////////////////////////////////////////////////////////////////////////////////\nstruct SimulationParams {\n  deltaTime : f32,\n  seed : vec4f,\n}\n\nstruct Particle {\n  position : vec3f,\n  lifetime : f32,\n  color    : vec4f,\n  velocity : vec3f,\n}\n\nstruct Particles {\n  particles : array<Particle>,\n}\n\n@binding(0) @group(0) var<uniform> sim_params : SimulationParams;\n@binding(1) @group(0) var<storage, read_write> data : Particles;\n@binding(2) @group(0) var texture : texture_2d<f32>;\n\n@compute @workgroup_size(64)\nfn simulate(\n  @builtin(global_invocation_id) GlobalInvocationID : vec3u\n) {\n  rand_seed = (sim_params.seed.xy + vec2f(GlobalInvocationID.xy)) * sim_params.seed.zw;\n\n  let idx = GlobalInvocationID.x;\n  var particle = data.particles[idx];\n\n  // Apply gravity\n  particle.velocity.z -= sim_params.deltaTime * 0.5;\n\n  // Basic velocity integration\n  particle.position += sim_params.deltaTime * particle.velocity;\n\n  // Age each particle. Fade out before vanishing.\n  particle.lifetime -= sim_params.deltaTime;\n  particle.color.a = smoothstep(0.0, 0.5, particle.lifetime);\n\n  // If the lifetime has gone negative, then the particle is dead and should be\n  // respawned.\n  if (particle.lifetime < 0.0) {\n    // Use the probability map to find where the particle should be spawned.\n    // Starting with the 1x1 mip level.\n    var coord : vec2i;\n    for (var level = u32(textureNumLevels(texture) - 1); level > 0; level--) {\n      // Load the probability value from the mip-level\n      // Generate a random number and using the probabilty values, pick the\n      // next texel in the next largest mip level:\n      //\n      // 0.0    probabilites.r    probabilites.g    probabilites.b   1.0\n      //  |              |              |              |              |\n      //  |   TOP-LEFT   |  TOP-RIGHT   | BOTTOM-LEFT  | BOTTOM_RIGHT |\n      //\n      let probabilites = textureLoad(texture, coord, level);\n      let value = vec4f(rand());\n      let mask = (value >= vec4f(0, probabilites.xyz)) & (value < probabilites);\n      coord = coord * 2;\n      coord.x = coord.x + select(0, 1, any(mask.yw)); // x  y\n      coord.y = coord.y + select(0, 1, any(mask.zw)); // z  w\n    }\n    let uv = vec2f(coord) / vec2f(textureDimensions(texture));\n    particle.position = vec3f((uv - 0.5) * 3 * vec2f(1, -1), 0);\n    particle.color = textureLoad(texture, coord, 0);\n    particle.velocity.x = (rand() - 0.5) * 0.1;\n    particle.velocity.y = (rand() - 0.5) * 0.1;\n    particle.velocity.z = rand() * 0.3;\n    particle.lifetime = 0.5 + rand() * 2.0;\n  }\n\n  // Store the new particle value\n  data.particles[idx] = particle;\n}\n",s="struct UBO {\n  width : u32,\n}\n\nstruct Buffer {\n  weights : array<f32>,\n}\n\n@binding(0) @group(0) var<uniform> ubo : UBO;\n@binding(1) @group(0) var<storage, read> buf_in : Buffer;\n@binding(2) @group(0) var<storage, read_write> buf_out : Buffer;\n@binding(3) @group(0) var tex_in : texture_2d<f32>;\n@binding(3) @group(0) var tex_out : texture_storage_2d<rgba8unorm, write>;\n\n\n////////////////////////////////////////////////////////////////////////////////\n// import_level\n//\n// Loads the alpha channel from a texel of the source image, and writes it to\n// the buf_out.weights.\n////////////////////////////////////////////////////////////////////////////////\n@compute @workgroup_size(64)\nfn import_level(@builtin(global_invocation_id) coord : vec3u) {\n  _ = &buf_in;\n  let offset = coord.x + coord.y * ubo.width;\n  buf_out.weights[offset] = textureLoad(tex_in, vec2i(coord.xy), 0).w;\n}\n\n////////////////////////////////////////////////////////////////////////////////\n// export_level\n//\n// Loads 4 f32 weight values from buf_in.weights, and stores summed value into\n// buf_out.weights, along with the calculated 'probabilty' vec4 values into the\n// mip level of tex_out. See simulate() in particle.wgsl to understand the\n// probability logic.\n////////////////////////////////////////////////////////////////////////////////\n@compute @workgroup_size(64)\nfn export_level(@builtin(global_invocation_id) coord : vec3u) {\n  if (all(coord.xy < vec2u(textureDimensions(tex_out)))) {\n    let dst_offset = coord.x   + coord.y   * ubo.width;\n    let src_offset = coord.x*2 + coord.y*2 * ubo.width;\n\n    let a = buf_in.weights[src_offset + 0];\n    let b = buf_in.weights[src_offset + 1];\n    let c = buf_in.weights[src_offset + 0 + ubo.width];\n    let d = buf_in.weights[src_offset + 1 + ubo.width];\n    let sum = dot(vec4f(a, b, c, d), vec4f(1));\n\n    buf_out.weights[dst_offset] = sum / 4;\n\n    let probabilities = vec4f(a, a+b, a+b+c, sum) / max(sum, 0.0001);\n    textureStore(tex_out, vec2i(coord.xy), probabilities);\n  }\n}\n",u="src/sample/particles/main.ts";let c=async e=>{let n,{canvas:i,pageState:u,gui:c}=e,l=await navigator.gpu.requestAdapter(),d=await l.requestDevice();if(!u.active)return;let p=i.getContext("webgpu"),m=window.devicePixelRatio||1,f=[i.clientWidth*m,i.clientHeight*m],g=navigator.gpu.getPreferredCanvasFormat();p.configure({device:d,size:f,format:g,alphaMode:"opaque"});let v=d.createBuffer({size:48e6,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.STORAGE}),h=d.createRenderPipeline({layout:"auto",vertex:{module:d.createShaderModule({code:o}),entryPoint:"vs_main",buffers:[{arrayStride:48,stepMode:"instance",attributes:[{shaderLocation:0,offset:0,format:"float32x3"},{shaderLocation:1,offset:16,format:"float32x4"}]},{arrayStride:8,stepMode:"vertex",attributes:[{shaderLocation:2,offset:0,format:"float32x2"}]}]},fragment:{module:d.createShaderModule({code:o}),entryPoint:"fs_main",targets:[{format:g,blend:{color:{srcFactor:"src-alpha",dstFactor:"one",operation:"add"},alpha:{srcFactor:"zero",dstFactor:"one",operation:"add"}}}]},primitive:{topology:"triangle-list"},depthStencil:{depthWriteEnabled:!1,depthCompare:"less",format:"depth24plus"}}),b=d.createTexture({size:f,format:"depth24plus",usage:GPUTextureUsage.RENDER_ATTACHMENT}),x=d.createBuffer({size:96,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),P=d.createBindGroup({layout:h.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:x}}]}),_={colorAttachments:[{view:void 0,clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"}],depthStencilAttachment:{view:b.createView(),depthClearValue:1,depthLoadOp:"clear",depthStoreOp:"store"}},B=d.createBuffer({size:48,usage:GPUBufferUsage.VERTEX,mappedAtCreation:!0});new Float32Array(B.getMappedRange()).set([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),B.unmap();let y=1,w=1,U=1;{let G=document.createElement("img");G.src=new t.U(t(9516)).toString(),await G.decode();let S=await createImageBitmap(G);for(;y<S.width||w<S.height;)y*=2,w*=2,U++;n=d.createTexture({size:[S.width,S.height,1],mipLevelCount:U,format:"rgba8unorm",usage:GPUTextureUsage.TEXTURE_BINDING|GPUTextureUsage.STORAGE_BINDING|GPUTextureUsage.COPY_DST|GPUTextureUsage.RENDER_ATTACHMENT}),d.queue.copyExternalImageToTexture({source:S},{texture:n},[S.width,S.height])}{let E=d.createComputePipeline({layout:"auto",compute:{module:d.createShaderModule({code:s}),entryPoint:"import_level"}}),T=d.createComputePipeline({layout:"auto",compute:{module:d.createShaderModule({code:s}),entryPoint:"export_level"}}),M=d.createBuffer({size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),C=d.createBuffer({size:y*w*4,usage:GPUBufferUsage.STORAGE}),O=d.createBuffer({size:y*w*4,usage:GPUBufferUsage.STORAGE});d.queue.writeBuffer(M,0,new Int32Array([y]));let L=d.createCommandEncoder();for(let R=0;R<U;R++){let z=y>>R,I=w>>R,A=0==R?E.getBindGroupLayout(0):T.getBindGroupLayout(0),F=d.createBindGroup({layout:A,entries:[{binding:0,resource:{buffer:M}},{binding:1,resource:{buffer:1&R?C:O}},{binding:2,resource:{buffer:1&R?O:C}},{binding:3,resource:n.createView({format:"rgba8unorm",dimension:"2d",baseMipLevel:R,mipLevelCount:1})}]});if(0==R){let V=L.beginComputePass();V.setPipeline(E),V.setBindGroup(0,F),V.dispatchWorkgroups(Math.ceil(z/64),I),V.end()}else{let q=L.beginComputePass();q.setPipeline(T),q.setBindGroup(0,F),q.dispatchWorkgroups(Math.ceil(z/64),I),q.end()}}d.queue.submit([L.finish()])}let j={simulate:!0,deltaTime:.04},N=d.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});Object.keys(j).forEach(e=>{c.add(j,e)});let W=d.createComputePipeline({layout:"auto",compute:{module:d.createShaderModule({code:o}),entryPoint:"simulate"}}),k=d.createBindGroup({layout:W.getBindGroupLayout(0),entries:[{binding:0,resource:{buffer:N}},{binding:1,resource:{buffer:v,offset:0,size:48e6}},{binding:2,resource:n.createView()}]}),D=f[0]/f[1],H=r.Ue(),X=r.Ue(),Y=r.Ue();r.G3(H,2*Math.PI/5,D,1,100),requestAnimationFrame(function e(){if(!u.active)return;d.queue.writeBuffer(N,0,new Float32Array([j.simulate?j.deltaTime:0,0,0,0,100*Math.random(),100*Math.random(),1+Math.random(),1+Math.random()])),r.yR(X),r.Iu(X,X,a.al(0,0,-3)),r.lM(X,X,-.2*Math.PI),r.Jp(Y,H,X),d.queue.writeBuffer(x,0,new Float32Array([Y[0],Y[1],Y[2],Y[3],Y[4],Y[5],Y[6],Y[7],Y[8],Y[9],Y[10],Y[11],Y[12],Y[13],Y[14],Y[15],X[0],X[4],X[8],0,X[1],X[5],X[9],0]));let n=p.getCurrentTexture();_.colorAttachments[0].view=n.createView();let t=d.createCommandEncoder();{let i=t.beginComputePass();i.setPipeline(W),i.setBindGroup(0,k),i.dispatchWorkgroups(Math.ceil(15625)),i.end()}{let o=t.beginRenderPass(_);o.setPipeline(h),o.setBindGroup(0,P),o.setVertexBuffer(0,v),o.setVertexBuffer(1,B),o.draw(6,1e6,0,0),o.end()}d.queue.submit([t.finish()]),requestAnimationFrame(e)})},l=()=>(0,i.T)({name:"Particles",description:"This example demonstrates rendering of particles simulated with compute shaders.",gui:!0,init:c,sources:[{name:u.substring(21),contents:"import { mat4, vec3 } from 'gl-matrix';\nimport { makeSample, SampleInit } from '../../components/SampleLayout';\n\nimport particleWGSL from './particle.wgsl';\nimport probabilityMapWGSL from './probabilityMap.wgsl';\n\nconst numParticles = 1000000;\nconst particlePositionOffset = 0;\nconst particleColorOffset = 4 * 4;\nconst particleInstanceByteSize =\n  3 * 4 + // position\n  1 * 4 + // lifetime\n  4 * 4 + // color\n  3 * 4 + // velocity\n  1 * 4 + // padding\n  0;\n\nconst init: SampleInit = async ({ canvas, pageState, gui }) => {\n  const adapter = await navigator.gpu.requestAdapter();\n  const device = await adapter.requestDevice();\n\n  if (!pageState.active) return;\n  const context = canvas.getContext('webgpu') as GPUCanvasContext;\n\n  const devicePixelRatio = window.devicePixelRatio || 1;\n  const presentationSize = [\n    canvas.clientWidth * devicePixelRatio,\n    canvas.clientHeight * devicePixelRatio,\n  ];\n  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();\n\n  context.configure({\n    device,\n    size: presentationSize,\n    format: presentationFormat,\n    alphaMode: 'opaque',\n  });\n\n  const particlesBuffer = device.createBuffer({\n    size: numParticles * particleInstanceByteSize,\n    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.STORAGE,\n  });\n\n  const renderPipeline = device.createRenderPipeline({\n    layout: 'auto',\n    vertex: {\n      module: device.createShaderModule({\n        code: particleWGSL,\n      }),\n      entryPoint: 'vs_main',\n      buffers: [\n        {\n          // instanced particles buffer\n          arrayStride: particleInstanceByteSize,\n          stepMode: 'instance',\n          attributes: [\n            {\n              // position\n              shaderLocation: 0,\n              offset: particlePositionOffset,\n              format: 'float32x3',\n            },\n            {\n              // color\n              shaderLocation: 1,\n              offset: particleColorOffset,\n              format: 'float32x4',\n            },\n          ],\n        },\n        {\n          // quad vertex buffer\n          arrayStride: 2 * 4, // vec2f\n          stepMode: 'vertex',\n          attributes: [\n            {\n              // vertex positions\n              shaderLocation: 2,\n              offset: 0,\n              format: 'float32x2',\n            },\n          ],\n        },\n      ],\n    },\n    fragment: {\n      module: device.createShaderModule({\n        code: particleWGSL,\n      }),\n      entryPoint: 'fs_main',\n      targets: [\n        {\n          format: presentationFormat,\n          blend: {\n            color: {\n              srcFactor: 'src-alpha',\n              dstFactor: 'one',\n              operation: 'add',\n            },\n            alpha: {\n              srcFactor: 'zero',\n              dstFactor: 'one',\n              operation: 'add',\n            },\n          },\n        },\n      ],\n    },\n    primitive: {\n      topology: 'triangle-list',\n    },\n\n    depthStencil: {\n      depthWriteEnabled: false,\n      depthCompare: 'less',\n      format: 'depth24plus',\n    },\n  });\n\n  const depthTexture = device.createTexture({\n    size: presentationSize,\n    format: 'depth24plus',\n    usage: GPUTextureUsage.RENDER_ATTACHMENT,\n  });\n\n  const uniformBufferSize =\n    4 * 4 * 4 + // modelViewProjectionMatrix : mat4x4<f32>\n    3 * 4 + // right : vec3f\n    4 + // padding\n    3 * 4 + // up : vec3f\n    4 + // padding\n    0;\n  const uniformBuffer = device.createBuffer({\n    size: uniformBufferSize,\n    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,\n  });\n\n  const uniformBindGroup = device.createBindGroup({\n    layout: renderPipeline.getBindGroupLayout(0),\n    entries: [\n      {\n        binding: 0,\n        resource: {\n          buffer: uniformBuffer,\n        },\n      },\n    ],\n  });\n\n  const renderPassDescriptor: GPURenderPassDescriptor = {\n    colorAttachments: [\n      {\n        view: undefined, // Assigned later\n        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },\n        loadOp: 'clear',\n        storeOp: 'store',\n      },\n    ],\n    depthStencilAttachment: {\n      view: depthTexture.createView(),\n\n      depthClearValue: 1.0,\n      depthLoadOp: 'clear',\n      depthStoreOp: 'store',\n    },\n  };\n\n  //////////////////////////////////////////////////////////////////////////////\n  // Quad vertex buffer\n  //////////////////////////////////////////////////////////////////////////////\n  const quadVertexBuffer = device.createBuffer({\n    size: 6 * 2 * 4, // 6x vec2f\n    usage: GPUBufferUsage.VERTEX,\n    mappedAtCreation: true,\n  });\n  // prettier-ignore\n  const vertexData = [\n    -1.0, -1.0, +1.0, -1.0, -1.0, +1.0, -1.0, +1.0, +1.0, -1.0, +1.0, +1.0,\n  ];\n  new Float32Array(quadVertexBuffer.getMappedRange()).set(vertexData);\n  quadVertexBuffer.unmap();\n\n  //////////////////////////////////////////////////////////////////////////////\n  // Texture\n  //////////////////////////////////////////////////////////////////////////////\n  let texture: GPUTexture;\n  let textureWidth = 1;\n  let textureHeight = 1;\n  let numMipLevels = 1;\n  {\n    const img = document.createElement('img');\n    img.src = new URL(\n      '../../../assets/img/webgpu.png',\n      import.meta.url\n    ).toString();\n    await img.decode();\n    const imageBitmap = await createImageBitmap(img);\n\n    // Calculate number of mip levels required to generate the probability map\n    while (\n      textureWidth < imageBitmap.width ||\n      textureHeight < imageBitmap.height\n    ) {\n      textureWidth *= 2;\n      textureHeight *= 2;\n      numMipLevels++;\n    }\n    texture = device.createTexture({\n      size: [imageBitmap.width, imageBitmap.height, 1],\n      mipLevelCount: numMipLevels,\n      format: 'rgba8unorm',\n      usage:\n        GPUTextureUsage.TEXTURE_BINDING |\n        GPUTextureUsage.STORAGE_BINDING |\n        GPUTextureUsage.COPY_DST |\n        GPUTextureUsage.RENDER_ATTACHMENT,\n    });\n    device.queue.copyExternalImageToTexture(\n      { source: imageBitmap },\n      { texture: texture },\n      [imageBitmap.width, imageBitmap.height]\n    );\n  }\n\n  //////////////////////////////////////////////////////////////////////////////\n  // Probability map generation\n  // The 0'th mip level of texture holds the color data and spawn-probability in\n  // the alpha channel. The mip levels 1..N are generated to hold spawn\n  // probabilities up to the top 1x1 mip level.\n  //////////////////////////////////////////////////////////////////////////////\n  {\n    const probabilityMapImportLevelPipeline = device.createComputePipeline({\n      layout: 'auto',\n      compute: {\n        module: device.createShaderModule({ code: probabilityMapWGSL }),\n        entryPoint: 'import_level',\n      },\n    });\n    const probabilityMapExportLevelPipeline = device.createComputePipeline({\n      layout: 'auto',\n      compute: {\n        module: device.createShaderModule({ code: probabilityMapWGSL }),\n        entryPoint: 'export_level',\n      },\n    });\n\n    const probabilityMapUBOBufferSize =\n      1 * 4 + // stride\n      3 * 4 + // padding\n      0;\n    const probabilityMapUBOBuffer = device.createBuffer({\n      size: probabilityMapUBOBufferSize,\n      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,\n    });\n    const buffer_a = device.createBuffer({\n      size: textureWidth * textureHeight * 4,\n      usage: GPUBufferUsage.STORAGE,\n    });\n    const buffer_b = device.createBuffer({\n      size: textureWidth * textureHeight * 4,\n      usage: GPUBufferUsage.STORAGE,\n    });\n    device.queue.writeBuffer(\n      probabilityMapUBOBuffer,\n      0,\n      new Int32Array([textureWidth])\n    );\n    const commandEncoder = device.createCommandEncoder();\n    for (let level = 0; level < numMipLevels; level++) {\n      const levelWidth = textureWidth >> level;\n      const levelHeight = textureHeight >> level;\n      const pipeline =\n        level == 0\n          ? probabilityMapImportLevelPipeline.getBindGroupLayout(0)\n          : probabilityMapExportLevelPipeline.getBindGroupLayout(0);\n      const probabilityMapBindGroup = device.createBindGroup({\n        layout: pipeline,\n        entries: [\n          {\n            // ubo\n            binding: 0,\n            resource: { buffer: probabilityMapUBOBuffer },\n          },\n          {\n            // buf_in\n            binding: 1,\n            resource: { buffer: level & 1 ? buffer_a : buffer_b },\n          },\n          {\n            // buf_out\n            binding: 2,\n            resource: { buffer: level & 1 ? buffer_b : buffer_a },\n          },\n          {\n            // tex_in / tex_out\n            binding: 3,\n            resource: texture.createView({\n              format: 'rgba8unorm',\n              dimension: '2d',\n              baseMipLevel: level,\n              mipLevelCount: 1,\n            }),\n          },\n        ],\n      });\n      if (level == 0) {\n        const passEncoder = commandEncoder.beginComputePass();\n        passEncoder.setPipeline(probabilityMapImportLevelPipeline);\n        passEncoder.setBindGroup(0, probabilityMapBindGroup);\n        passEncoder.dispatchWorkgroups(Math.ceil(levelWidth / 64), levelHeight);\n        passEncoder.end();\n      } else {\n        const passEncoder = commandEncoder.beginComputePass();\n        passEncoder.setPipeline(probabilityMapExportLevelPipeline);\n        passEncoder.setBindGroup(0, probabilityMapBindGroup);\n        passEncoder.dispatchWorkgroups(Math.ceil(levelWidth / 64), levelHeight);\n        passEncoder.end();\n      }\n    }\n    device.queue.submit([commandEncoder.finish()]);\n  }\n\n  //////////////////////////////////////////////////////////////////////////////\n  // Simulation compute pipeline\n  //////////////////////////////////////////////////////////////////////////////\n  const simulationParams = {\n    simulate: true,\n    deltaTime: 0.04,\n  };\n\n  const simulationUBOBufferSize =\n    1 * 4 + // deltaTime\n    3 * 4 + // padding\n    4 * 4 + // seed\n    0;\n  const simulationUBOBuffer = device.createBuffer({\n    size: simulationUBOBufferSize,\n    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,\n  });\n\n  Object.keys(simulationParams).forEach((k) => {\n    gui.add(simulationParams, k);\n  });\n\n  const computePipeline = device.createComputePipeline({\n    layout: 'auto',\n    compute: {\n      module: device.createShaderModule({\n        code: particleWGSL,\n      }),\n      entryPoint: 'simulate',\n    },\n  });\n  const computeBindGroup = device.createBindGroup({\n    layout: computePipeline.getBindGroupLayout(0),\n    entries: [\n      {\n        binding: 0,\n        resource: {\n          buffer: simulationUBOBuffer,\n        },\n      },\n      {\n        binding: 1,\n        resource: {\n          buffer: particlesBuffer,\n          offset: 0,\n          size: numParticles * particleInstanceByteSize,\n        },\n      },\n      {\n        binding: 2,\n        resource: texture.createView(),\n      },\n    ],\n  });\n\n  const aspect = presentationSize[0] / presentationSize[1];\n  const projection = mat4.create();\n  const view = mat4.create();\n  const mvp = mat4.create();\n  mat4.perspective(projection, (2 * Math.PI) / 5, aspect, 1, 100.0);\n\n  function frame() {\n    // Sample is no longer the active page.\n    if (!pageState.active) return;\n\n    device.queue.writeBuffer(\n      simulationUBOBuffer,\n      0,\n      new Float32Array([\n        simulationParams.simulate ? simulationParams.deltaTime : 0.0,\n        0.0,\n        0.0,\n        0.0, // padding\n        Math.random() * 100,\n        Math.random() * 100, // seed.xy\n        1 + Math.random(),\n        1 + Math.random(), // seed.zw\n      ])\n    );\n\n    mat4.identity(view);\n    mat4.translate(view, view, vec3.fromValues(0, 0, -3));\n    mat4.rotateX(view, view, Math.PI * -0.2);\n    mat4.multiply(mvp, projection, view);\n\n    // prettier-ignore\n    device.queue.writeBuffer(\n      uniformBuffer,\n      0,\n      new Float32Array([\n        // modelViewProjectionMatrix\n        mvp[0], mvp[1], mvp[2], mvp[3],\n        mvp[4], mvp[5], mvp[6], mvp[7],\n        mvp[8], mvp[9], mvp[10], mvp[11],\n        mvp[12], mvp[13], mvp[14], mvp[15],\n\n        view[0], view[4], view[8], // right\n\n        0, // padding\n\n        view[1], view[5], view[9], // up\n\n        0, // padding\n      ])\n    );\n    const swapChainTexture = context.getCurrentTexture();\n    // prettier-ignore\n    renderPassDescriptor.colorAttachments[0].view = swapChainTexture.createView();\n\n    const commandEncoder = device.createCommandEncoder();\n    {\n      const passEncoder = commandEncoder.beginComputePass();\n      passEncoder.setPipeline(computePipeline);\n      passEncoder.setBindGroup(0, computeBindGroup);\n      passEncoder.dispatchWorkgroups(Math.ceil(numParticles / 64));\n      passEncoder.end();\n    }\n    {\n      const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);\n      passEncoder.setPipeline(renderPipeline);\n      passEncoder.setBindGroup(0, uniformBindGroup);\n      passEncoder.setVertexBuffer(0, particlesBuffer);\n      passEncoder.setVertexBuffer(1, quadVertexBuffer);\n      passEncoder.draw(6, numParticles, 0, 0);\n      passEncoder.end();\n    }\n\n    device.queue.submit([commandEncoder.finish()]);\n\n    requestAnimationFrame(frame);\n  }\n  requestAnimationFrame(frame);\n};\n\nconst Particles: () => JSX.Element = () =>\n  makeSample({\n    name: 'Particles',\n    description:\n      'This example demonstrates rendering of particles simulated with compute shaders.',\n    gui: true,\n    init,\n    sources: [\n      {\n        name: __filename.substring(__dirname.length + 1),\n        contents: __SOURCE__,\n      },\n      {\n        name: './particle.wgsl',\n        contents: particleWGSL,\n        editable: true,\n      },\n      {\n        name: './probabilityMap.wgsl',\n        contents: probabilityMapWGSL,\n        editable: true,\n      },\n    ],\n    filename: __filename,\n  });\n\nexport default Particles;\n"},{name:"./particle.wgsl",contents:o,editable:!0},{name:"./probabilityMap.wgsl",contents:s,editable:!0}],filename:u});var d=l},9147:function(e){e.exports={canvasContainer:"SampleLayout_canvasContainer__zRR_l",sourceFileNav:"SampleLayout_sourceFileNav__ml48P",sourceFileContainer:"SampleLayout_sourceFileContainer__3s84x",updateSourceBtn:"SampleLayout_updateSourceBtn__L2sFc"}},9516:function(e,n,t){"use strict";e.exports=t.p+"static/assets/img/webgpu.fd85b973fb5ae811.png"}}]);