window.CompileProgram=function(data){
    
    return Object.constructor(`return function(div){
        try{
        
        let canvas=document.createElement('canvas')
        canvas.width=div.width
        canvas.height=div.height
        div.appendChild(canvas)
        let Data=${JSON.stringify(data)},Engine={data:Data,deltaTime:0,time:0,then:0,timeMultiplier:Data._settings.timeMultiplier*0.001,maxDeltaTime:Data._settings.maxDeltaTime,minDeltaTime:Data._settings.minDeltaTime,width:canvas.width-0,height:canvas.height-0,aspect:(canvas.width-0)/(canvas.height-0),uniformedPrograms:{},canvas:canvas,div:div,physics:new CANNON.World(),cachedPowersOf2:[1,2,4,8,16,32,64,128,256,512,1024,2048,4096,8192,16384,32768,65536,131072,262144,524288,1048576,2097152,4194304,8388608,16777216,33554432,67108864,134217728,268435456,536870912,1073741824,2147483648]},AllObjects,Materials={},Scripts={},Textures={},Meshes,Lights_static,Lights_dynamic,Shadowers,Pipeline=Data._pipeline,arrayParse=(s)=>typeof s==='object'?s:s.substring(1,s.length-1).split(',').map(x=>x.length?isNaN(Number(x))?x.trim():Number(x.trim()):undefined).filter(x=>x!==undefined),dynamicLightInfoAmount=0,dynamicLightUniformArray
        Engine.texCanvas=new OffscreenCanvas(Data._settings.textureDrawingCanvasWidth,Data._settings.textureDrawingCanvasHeight)
        Engine.texCTX=Engine.texCanvas.getContext('2d')
        
        Engine.physics.broadphase=new CANNON.SAPBroadphase(Engine.physics)
        Engine.physics.broadphase.useBoundingBoxes=true
        Engine.physics.gravity.set(...Data._settings.gravity)
        Engine.physics.solver=new CANNON.GSSolver()
        Engine.physics.quatNormalizeSkip=Data._settings.quatNormalizeSkip
        Engine.physics.quatNormalizeFast=Data._settings.quatNormalizeFast
        Engine.physics.defaultContactMaterial.friction=Data._settings.defaultFriction
        Engine.physics.defaultContactMaterial.restitution=Data._settings.defaultRestitution
        
        Engine.noiseProperties={
            octaves:5,
            decay:0.5,
            upscale:2
        }
        Engine.Hash_1=(x)=>{
            let n=(x+10.521)*x*3.6293-x*563.252
            return n-Math.floor(n)
        }
        Engine.Hash_2=(x,y)=>{
            let n=(x*60.51+y*49.521-(x*y*257.611))*(x+y)
            return n-Math.floor(n)
        }
        Engine.Hash_3=(x,y,z)=>{
            let n=(x*60.51+y*49.521*z*73.523-(x*y*100.836+z*201.51))*(x+y+z)
            return n-Math.floor(n)
        }
        Engine.Smoothstep=(a,b,t)=>{
            return (b-a)*t*t*(3-(t+t))+a
        }
        Engine.Noise1D_base=(x)=>{
            let _x=Math.floor(x)
            return Engine.Smoothstep(Engine.Hash_1(_x),Engine.Hash_1(_x+1),x-_x)
        }
        Engine.Noise2D_base=(x,y)=>{
            let _x=Math.floor(x),_y=Math.floor(y),lt=Engine.Hash_2(_x,_y),lb=Engine.Hash_2(_x,_y+1),rt=Engine.Hash_2(_x+1,_y),rb=Engine.Hash_2(_x+1,_y+1),l=Engine.Smoothstep(lt,lb,y-_y),r=Engine.Smoothstep(rt,rb,y-_y)
            return Engine.Smoothstep(l,r,x-_x)
        }
        Engine.Noise3D_base=(x,y,z)=>{
            let _x=Math.floor(x),_y=Math.floor(y),_z=Math.floor(z),ltf=Engine.Hash_3(_x,_y,_z),rtf=Engine.Hash_3(_x+1,_y,_z),rbf=Engine.Hash_3(_x+1,_y+1,_z),rbb=Engine.Hash_3(_x+1,_y+1,_z+1),lbb=Engine.Hash_3(_x,_y+1,_z+1),ltb=Engine.Hash_3(_x,_y,_z+1),rtb=Engine.Hash_3(_x+1,_y,_z+1),lbf=Engine.Hash_3(_x,_y+1,_z),lt=Engine.Smoothstep(ltf,ltb,z-_z),lb=Engine.Smoothstep(lbf,lbb,z-_z),rt=Engine.Smoothstep(rtf,rtb,z-_z),rb=Engine.Smoothstep(rbf,rbb,z-_z),l=Engine.Smoothstep(lt,lb,y-_y),r=Engine.Smoothstep(rt,rb,y-_y)
            
            return Engine.Smoothstep(l,r,x-_x)
        }
        Engine.Noise1D=(x)=>{
            let n=0,d=1,u=1,_x=x,t=0
            for(let i=0;i<Engine.noiseProperties.octaves;i++){
                n+=Engine.Noise1D_base(_x)*d
                t+=d
                d*=Engine.noiseProperties.decay
                _x*=Engine.noiseProperties.upscale
            }
            return n/(t)
        }
        Engine.Noise2D=(x,y)=>{
            let n=0,d=1,u=1,_x=x,_y=y,t=0
            for(let i=0;i<Engine.noiseProperties.octaves;i++){
                n+=(Engine.Noise2D_base(_x,_y)+Engine.Noise2D_base(_y*0.707107-_x*0.707107-100,_y*0.707107+_x*0.707107-100)+Engine.Noise2D_base(_y*-0.707107+_x*0.707107-200,_y*-0.707107-_x*0.707107-200))*d
                t+=d
                d*=Engine.noiseProperties.decay
                _x*=Engine.noiseProperties.upscale
                _y*=Engine.noiseProperties.upscale
            }
            return n/(t*3)
        }
        Engine.Noise3D=(x,y,z)=>{
            let n=0,d=1,u=1,_x=x,_y=y,_z=z,t=0
            for(let i=0;i<Engine.noiseProperties.octaves;i++){
                n+=(Engine.Noise3D_base(_x,_y,_z)+Engine.Noise3D_base(_y*0.707107-_x*0.707107-100,_y*0.707107+_x*0.707107-100,_z-100)+Engine.Noise3D_base(_y*-0.707107+_x*0.707107-200,_y*-0.707107-_x*0.707107-200,_z-200))*d
                t+=d
                d*=Engine.noiseProperties.decay
                _x*=Engine.noiseProperties.upscale
                _y*=Engine.noiseProperties.upscale
                _z*=Engine.noiseProperties.upscale
            }
            return n/(t*3)
        }
        
        Engine.gl=D.getContext(canvas,Data._settings.contextAttributes)
        D.viewport(0,0,Engine.width,Engine.height)
        D.enable3D()
        
        Engine.materials=Materials
        Engine.pipeline=Pipeline
        Engine.scripts=Scripts
        Engine.assets=Data._assets
        Engine.textures=Textures
        
        for(let i in Data._settings.dynamicLightsInfo)if(Data._settings.dynamicLightsInfo[i])dynamicLightInfoAmount+={position:3,rotation:3,color:3}[i]||1
        
        for(let i in Data._assets){
            let s=Data._assets[i]
            switch(s.type){
                case 'script':
                    Scripts[i]={}
                    let c
                    switch(s.lang){
                        case 'js':
                            c=Object.constructor('This','Engine','let Export={};'+s.code+'\\nreturn Export')(),nothing=()=>0
                            Scripts[i].onCreate=c.OnCreate||nothing
                            Scripts[i].onUpdate=c.OnUpdate||nothing
                            Scripts[i].getTexture=c.GetTexture||nothing
                        break
                        case 'glsl':
                            c=s.code.trim().split('@')
                            for(let j in c){
                                let cj=(c[j]=c[j].trim()).substring(c[j].indexOf('{')+1,c[j].length-1),test=c[j].substring(0,c[j].indexOf('{'))
                                if(test.indexOf('VertexShader')>-1)
                                    Scripts[i].vsh=cj
                                else if(test.indexOf('FragmentShader')>-1)
                                    Scripts[i].fsh=cj
                            }
                        break
                        case 'txt':
                            Scripts[i].text=s.code
                        break
                    }
                break
                case 'renderTarget':
                    s.tex=D.createTexture(Math.ceil(s.resType==='define'?s.width:Engine.width*s.width),Math.ceil(s.resType==='define'?s.height:Engine.height*s.height),null,s.filtering,s.wrapping,s.internalFormat,s.format,s.memoryType)
                break
                case 'texture':Textures[i]=s;break
            }
        }
        let lastParent,amountOfShadowers=0,recurse=function(o){
            for(let i in o){
                switch(o[i].type){
                    case 'mesh':
                        Meshes[i]=o[i]
                    break
                    case 'geometry':
                    break
                    case 'camera':
                        Engine.camera=o[i]
                    break
                    case 'shadower':
                        Shadowers[i]=o[i]
                        Shadowers[i].meshes=[]
                        amountOfShadowers++
                    break
                    case 'light':
                        if(o[i].dynamic)Lights_dynamic[i]=o[i];else Lights_static[i]=o[i]
                    break
                }
                if(Data._hierarchy[i])lastParent=undefined
                o[i].parent=lastParent
                o[i].name=i
                if(o[i].type!=='geometry')AllObjects[i]=o[i]
                if(o[i].children){
                    lastParent=o[i]
                    recurse(o[i].children)
                }
            }
        }
        Engine.CompileHierarchy=()=>{
            
            AllObjects={}
            Meshes={}
            Lights_static={}
            Lights_dynamic={}
            Shadowers={}
            
            recurse(Data._hierarchy)
            
            dynamicLightUniformArray=0
            for(let i in Lights_dynamic)
                dynamicLightUniformArray+=dynamicLightInfoAmount
            Engine.dynamicLightsAmount=dynamicLightUniformArray
            dynamicLightUniformArray=new Float32Array(dynamicLightUniformArray)
            
            Engine.allObjects=AllObjects
            Engine.meshes=Meshes
            Engine.lights_static=Lights_static
            Engine.lights_dynamic=Lights_dynamic
            Engine.shadowers=Shadowers
        }
        Engine.CompileHierarchy()
        
        Engine.shadowMapProgram=D.createProgram(\`#version 300 es
                precision mediump float;\nin vec3 vertPos;\nin vec3 vertNormal;\nin vec3 vertColor;\nin vec2 vertUV;\${(function(){let s='';for(let i=0;i<${data._settings.vertexDataAttributesInShadowMappingProgram};i++)s+='in float vertData_'+i+';';return s})()}\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;
                void main(){
                    gl_Position=viewMatrix*modelMatrix*vec4(vertPos,1);
                }\`,\`#version 300 es
                precision mediump float;\nout vec4 FragColor;
                
                void main(){
                    FragColor=vec4(0,0,0,1);
                }\`,1)
        
        Engine.CompilePipeline=()=>{
            for(let i in Pipeline){
                let p=Pipeline[i]
                switch(p.type){
                    case 'RenderShadowMaps':
                        p.run=renderShadowMaps
                    break
                    case 'ComputeTransformations':
                        p.run=computeTransformations
                    break
                    case 'UpdatePhysics':
                        p.run=()=>Engine.physics.step(Engine.deltaTime)
                    break
                    case 'MainRender':
                        
                        Engine.mainRenderOutputFB=null
                        
                        p.outputs=arrayParse(p.outputs)
                        if(p.outputs.length>1){
                            
                            Engine.mainRenderOutputFB=D.createFramebuffer(false,p.depthBuffer)
                            let draws=[]
                            for(let i in p.outputs)
                                draws.push(Data._assets[p.outputs[i]].tex)
                            D.drawBuffers(draws)
                        }else if(p.outputs.length===1){
                            
                            Engine.mainRenderOutputFB=D.createFramebuffer(Data._assets[p.outputs[0]].tex,p.depthBuffer)
                        }
                        
                        p.run=MainRender
                    break
                    case 'PostProcessor':
                        let texArr=[],out=null,w,h
                        p.outputs=arrayParse(p.outputs)
                        if(p.outputs.length>1){
                            
                            out=D.createFramebuffer(false,p.depthBuffer)
                            let draws=[]
                            for(let i in p.outputs)
                                draws.push(Data._assets[p.outputs[i]].tex)
                            D.drawBuffers(draws)
                            
                        }else if(p.outputs.length===1){
                            
                            out=D.createFramebuffer(Data._assets[p.outputs[0]].tex,p.depthBuffer)
                        }
                        
                        if(out){
                            w=Data._assets[p.outputs[0]].tex.width
                            h=Data._assets[p.outputs[0]].tex.height
                        }else {
                            w=Engine.width
                            h=Engine.height
                        }
                        D.viewport(0,0,w,h)
                        p.program=D.createProgram(Scripts[p.script].vsh,Scripts[p.script].fsh,1)
                        p.inputs=arrayParse(p.inputs)
                        for(let i in p.inputs){
                            texArr.push(i,Data._assets[p.inputs[i]].tex)
                            D.setUniform('input_'+i,i)
                        }
                        p.run=()=>{
                            D.useProgram(p.program)
                            D.bindFramebuffer(out)
                            D.viewport(0,0,w,h)
                            D.activeTextures(texArr)
                            D.setUniform('time',[Engine.time])
                            D.setUniform('viewMatrix',Engine.camera.transform.viewMatrix)
                            D.renderMesh(screenMesh)
                        }
                    break
                }
            }
        }
        Engine.CompilePipeline()
        
        let screenMesh=D.createMesh(D.createMeshData({meshes:[{type:'plane',x:0,y:0,z:0,size:2,r:0,g:0,b:0,rx:90,ry:0,rz:0}],order:['x','y']}),[['vertPos',2,8,0]]),data=null
        
        Engine.GetAsset=(i)=>Data._assets[i]
        Engine.GetObject=(i)=>AllObjects[i]
        Engine.GetPass=(i)=>Data._pipeline[i]
        
        Engine.CreateElement=(type)=>({material:{type:'material',specularExponent:300,specularIntensity:0.75,extraDataFormat:'[]',vertexData:{position:true,normal:true,color:true,uv:true},texture:'[]',normalMap:'',instancedDataFormat:'[]',recieveShadows:true,recieveShadowsFrom:'[]'},renderTarget:{type:'renderTarget',width:1,height:1,resType:'scale'},texture:{type:'texture',width:128,height:128,filtering:'NEAREST',wrapping:'REPEAT',internalFormat:'RGBA',format:'RGBA',memoryType:'UNSIGNED_BYTE',mipmapping:true},block:{type:'block',transform:{position:[0,0,0],rotation:[0,0,0],scale:[1,1,1]},computeTransformations:true},camera:{type:'camera',clearColor:[0,0,0,1],transform:{position:[0,0,0],rotation:[0,0,0],scale:[1,1,1]},computeTransformations:true,projectionType:'perspective',FOV:70,near:0.01,far:1000},shadower:{type:'shadower',transform:{position:[0,0,0],rotation:[0,0,0],scale:[1,1,1]},computeTransformations:true,projectionType:'perspective',FOV:50,near:1,far:25,computeShadowMap:true,width:512,height:512,blurSamples:1,blurRadius:0.001,intensity:0.35,biasScale:0.1,biasAdd:0.001},mesh:{type:'mesh',material:'DefaultMaterial',transform:{position:[0,0,0],rotation:[0,0,0],scale:[1,1,1]},computeTransformations:true,render:true,wireframe:false,castShadows:true,castShadowsTo:'[]',defaultData:'[]',physics:{usePhysics:false,type:'DYNAMIC',mass:1,collisionGroup:0,collisionMask:'[]',fixedRotation:false}},geometry:{type:'geometry',render:true,data:{type:'sphere',x:0,y:0,z:0,w:1,h:1,l:1,radius:0.5,radius2:0.5,height:1,detail:1,r:1,g:1,b:1,rx:0,ry:0,rz:0,sx:1,sy:1,sz:1,obj:'',textureMapping:D.DTMPING_(),data:'[]'},autoUVBounds:true,physics:{usePhysics:true,position:[0,0,0],rotation:[0,0,0],scale:[1,1,1]}},light:{type:'light',lightType:'point',transform:{position:[0,0,0],rotation:[0,0,0],scale:[1,1,1]},computeTransformations:true,dynamic:false,intensity:1,color:[1,1,1],attenuationPolynomial:'X*X',innerCone:-1,outerCone:-1,diffuseRemapScale:1,diffuseRemapAdd:0,illuminates:true,illuminatesMaterials:'[]'},UpdatePhysics:{type:'UpdatePhysics'},ComputeTransformations:{type:'ComputeTransformations'},RenderShadowMaps:{type:'RenderShadowMaps'},MainRender:{type:'MainRender',outputs:'[]',framebufferDepthBuffer:true},PostProcessor:{type:'PostProcessor',inputs:'[]',outputs:'[]',depthBuffer:false,filtering:'NEAREST',wrapping:'CLAMP_TO_EDGE',internalFormat:'RGBA',format:'RGBA',memoryType:'UNSIGNED_BYTE'}})[type]
        
        function InitalizeTexture(m){
            
            if(m.script)data=Scripts[m.script].getTexture(Engine.texCTX,Engine)
            m.texture=D.createTexture(m.width,m.height,data,m.filtering,m.wrapping,m.internalFormat,m.format,m.memoryType,m.mipmapping)
        }
        
        for(let i in Textures)InitalizeTexture(Textures[i])
        Engine.InitalizeTexture=InitalizeTexture
        
        function InitalizeMaterial(m){
            Materials[m.name]=m
            m.shadowers=[]
            m.activeTexturesArr=[]
            m.recieveShadowsFrom=arrayParse(m.recieveShadowsFrom)
            m.extraDataFormat=arrayParse(m.extraDataFormat)
            m.instancedDataFormat=arrayParse(m.instancedDataFormat)
            m.texture=arrayParse(m.texture)
            let c=0
            for(let i in m.texture)
                m.activeTexturesArr.push(c++,Data._assets[m.texture[i]].texture)
            if(m.normalMap.length)
                m.activeTexturesArr.push(c++,Data._assets[m.normalMap].texture)
            let sc=c
            for(let i in Shadowers)
                if(m.recieveShadows||m.recieveShadowsFrom.indexOf(i)>-1){
                    m.shadowers.push(Shadowers[i])
                    m.activeTexturesArr.push(c++,Shadowers[i].tex)
                }
            let hardcode=(s)=>s.replaceAll('HARDCODED_VERTEX_ATTRIBUTES',(function(){
                    let s=''
                    
                    if(m.vertexData.position)s+='in vec3 vertPos;'
                    if(m.vertexData.normal)s+='in vec3 vertNormal;'
                    if(m.vertexData.color)s+='in vec3 vertColor;'
                    if(m.vertexData.uv)s+='in vec2 vertUV;'
                    
                    for(let i in m.extraDataFormat){
                        let d=m.extraDataFormat[i]-0
                        s+='in '+['','float','vec2','vec3','vec4'][d]+' vertData_'+i+';'
                    }
                return s
                })()).replaceAll('HARDCODED_INSTANCED_ATTRIBUTES',(function(){
                    let s='',attribs=[],offset=0
                    for(let i in m.instancedDataFormat){
                        let d=m.instancedDataFormat[i]-0
                        s+='in '+['','float','vec2','vec3','vec4'][d]+' instanceData_'+i+';'
                        attribs.push(['instanceData_'+i,d,0,offset])
                        offset+=d<<2
                    }
                    for(let i in attribs){
                        attribs[i][2]=offset
                    }
                    m.instancedAttribs=attribs.length?attribs:0
                    return s
                })()).replaceAll('HARDCODED_UNIFORMS',(
                    (()=>{
                        let s=''
                        for(let i in m.texture)s+='uniform sampler2D albedoTexture_'+i+';'
                        return s
                    })())+(m.normalMap.length?'uniform sampler2D normalTexture;':'')+(function(){
                    let s='',DLIL=0
                    for(let i in Lights_dynamic){
                        let l=Lights_dynamic[i]
                        
                        l.illuminatesMaterials=arrayParse(l.illuminatesMaterials)
                        if(l.illuminates||l.illuminatesMaterials.indexOf(m.name)>-1)DLIL+=dynamicLightInfoAmount
                        
                    }
                    s+=DLIL?'uniform float dynamicLightInfoArray['+DLIL+'];':''
                    for(let i in m.shadowers)
                        s+='uniform sampler2D shadowTexture_'+i+';'
                    return s
                })()).replaceAll('HARDCODED_SPECULAR_EXPONENT',D.floatize(m.specularExponent)).replaceAll('HARDCODED_SPECULAR_INTENSITY',D.floatize(m.specularIntensity)).replaceAll('HARDCODED_STATIC_LIGHT_COMPUTATIONS',(function(){
                    let s=''
                    for(let i in Lights_static){
                        let l=Lights_static[i]
                        if(!l.illuminates&&l.illuminatesMaterials.indexOf(m.name)<0)continue
                        switch(l.lightType){
                            case 'ambient':
                                s+='color+=applyAmbientLight(pix,vec3('+l.color.join(',')+'),'+D.floatize(l.intensity)+');'
                            break
                            case 'directional':
                                s+='color+=applyDirectionalLight(pix,normal,vec3('+l.transform.direction.join(',')+'),vec3('+l.color.join(',')+'),'+D.floatize(l.intensity)+','+D.floatize(l.diffuseRemapScale)+','+D.floatize(l.diffuseRemapAdd)+');'
                            break
                            case 'point':
                                s+='vec3 _'+i+'toLight=vec3('+l.transform.position.join(',')+')-pixPos;float _'+i+'x=length(_'+i+'toLight);_'+i+'toLight/=_'+i+'x;color+=applyPointLight(_'+i+'toLight,'+l.attenuationPolynomial.trim().replaceAll('X','_'+i+'x')+',pix,normal,vec3('+l.transform.direction.join(',')+'),vec3('+l.color.join(',')+'),'+D.floatize(l.intensity)+','+D.floatize(l.innerCone)+','+D.floatize(l.outerCone)+','+D.floatize(l.diffuseRemapScale)+','+D.floatize(l.diffuseRemapAdd)+');'
                            break
                        }
                    }
                    return s
                })()).replaceAll('HARDCODED_DYNAMIC_LIGHT_COMPUTATIONS',(function(){
                    let s='',index=0,key=Data._settings.dynamicLightsInfo,DLIA='dynamicLightInfoArray'
                    for(let i in Lights_dynamic){
                        let l=Lights_dynamic[i],id=index
                        l.index=index
                        index+=dynamicLightInfoAmount
                        if(!l.illuminates&&l.illuminatesMaterials.indexOf(m.name)<0)continue
                        
                        let POS=key.position?DLIA+'['+(id++)+'],'+DLIA+'['+(id++)+'],'+DLIA+'['+(id++)+']':l.transform.position.join(','),
                            ROT=key.rotation?DLIA+'['+(id++)+'],'+DLIA+'['+(id++)+'],'+DLIA+'['+(id++)+']':l.transform.direction.join(','),
                            INS=key.intensity?DLIA+'['+(id++)+']':D.floatize(l.intensity),
                            COL=key.color?DLIA+'['+(id++)+'],'+DLIA+'['+(id++)+'],'+DLIA+'['+(id++)+']':l.transform.color.join(','),
                            IC=key.innerCone?DLIA+'['+(id++)+']':D.floatize(l.innerCone),
                            OC=key.outerCone?DLIA+'['+(id++)+']':D.floatize(l.outerCone),
                            DRS=key.diffuseRemapScale?DLIA+'['+(id++)+']':D.floatize(l.diffuseRemapScale),
                            DRA=key.diffuseRemapAdd?DLIA+'['+(id++)+']':D.floatize(l.diffuseRemapAdd)
                        
                        switch(l.lightType){
                            case 'ambient':
                                s+='color+=applyAmbientLight(pix,vec3('+COL+'),'+INS+');'
                            break
                            case 'directional':
                                s+='color+=applyDirectionalLight(pix,normal,vec3('+ROT+'),vec3('+COL+'),'+INS+','+DRS+','+DRA+');'
                            break
                            case 'point':
                                s+='vec3 _'+i+'toLight=vec3('+POS+')-pixPos;float _'+i+'x=length(_'+i+'toLight);_'+i+'toLight/=_'+i+'x;color+=applyPointLight(_'+i+'toLight,'+l.attenuationPolynomial.trim().replaceAll('X','_'+i+'x')+',pix,normal,vec3('+ROT+'),vec3('+COL+'),'+INS+','+IC+','+OC+','+DRS+','+DRA+');'
                            break
                        }
                    }
                return s})()).replaceAll('HARDCODED_NORMAL_MAP_COMPUTATIONS',(()=>m.normalMap.length?'vec3 _tan=cross(normal,vec3(0,0.9999999,0.0000001));vec3 _bitan=cross(normal,_tan);mat3 _tbn=mat3(_tan,_bitan,normal);normal=_tbn*(texture(normalTexture,uv).rgb*2.0-1.0);':'')()).replaceAll('HARDCODED_SHADOW_COMPUTATIONS',(()=>{
                    let s=''
                    for(let i in m.shadowers){
                        let l=m.shadowers[i]
                        s+='shadow*=applyShadow(shadowTexture_'+i+',mat4('+l.transform.viewMatrix.join(',')+'),vec3('+l.transform.matrix.slice(12,15).join(',')+'),normal,'+(l.blurSamples|0)+','+D.floatize(l.blurRadius/(l.blurSamples||1))+','+D.floatize(l.intensity/((l.blurSamples*2+1)*(l.blurSamples*2+1)))+','+D.floatize(l.biasScale)+','+D.floatize(l.biasAdd)+');'}
                    return s
                })())
            
            m.program=m.script?D.createProgram(hardcode(Scripts[m.script].vsh),hardcode(Scripts[m.script].fsh),1):D.createProgram(hardcode(\`#version 300 es\\nprecision mediump float;HARDCODED_VERTEX_ATTRIBUTESHARDCODED_INSTANCED_ATTRIBUTESuniform mat4 modelMatrix;uniform mat4 viewMatrix;out vec3 pixPos;out vec3 pixNormal;out vec3 pixColor;out vec2 pixUV;void main(){vec4 pos=modelMatrix*vec4(vertPos,1);pixPos=pos.xyz;pixNormal=mat3(modelMatrix)*vertNormal;pixColor=vertColor;pixUV=vertUV;gl_Position=viewMatrix*pos;}\`),hardcode(\`#version 300 es
precision mediump float;

in vec3 pixPos;
in vec3 pixNormal;
in vec3 pixColor;
in vec2 pixUV;
    
uniform vec3 camPos;

HARDCODED_UNIFORMS

out vec4 FragColor;

vec3 applyAmbientLight(vec3 pix,vec3 col,float inst){
    return pix*col*inst;
}
vec3 applyDirectionalLight(vec3 pix,vec3 normal,vec3 dir,vec3 col,float inst,float diffuseRemapScale,float diffuseRemapAdd){
    float diffuse=max(dot(-dir,normal)*diffuseRemapScale+diffuseRemapAdd,0.0);
    vec3 toLight=dir;
    float specular=pow(max(dot(normalize(-dir+normalize(camPos-pixPos)),normal),0.0),HARDCODED_SPECULAR_EXPONENT);
    return (diffuse*pix+specular*HARDCODED_SPECULAR_INTENSITY)*inst*col;
}
vec3 applyPointLight(vec3 toLight,float x,vec3 pix,vec3 normal,vec3 dir,vec3 col,float inst,float innerCone,float outerCone,float diffuseRemapScale,float diffuseRemapAdd){
    float diffuse=max(dot(toLight,normal)*diffuseRemapScale+diffuseRemapAdd,0.0);
    float specular=pow(max(dot(normalize(toLight+normalize(camPos-pixPos)),normal),0.0),HARDCODED_SPECULAR_EXPONENT);
    
    float conal=smoothstep(outerCone,innerCone,dot(toLight,-dir));
    return (diffuse*pix+specular*HARDCODED_SPECULAR_INTENSITY)*conal*inst*col/x;
}
float applyShadow(sampler2D tex,mat4 mat,vec3 pos,vec3 normal,int blurSamples,float blurRadius,float inst,float biasScale,float biasAdd){
    
    vec4 proj=mat*vec4(pixPos,1);
    proj.xyz/=proj.w;
    proj.xyz=proj.xyz*0.5+0.5;
    
    float currentDepth=proj.z-max((0.5-dot(normalize(pos-pixPos),normal))*biasScale,biasAdd);
    float shadow=1.0;
    
    for(int y=-blurSamples;y<=blurSamples;y++){
        for(int x=-blurSamples;x<=blurSamples;x++){
            float projDepth=texture(tex,proj.xy+vec2(x,y)*blurRadius).r;
            if(projDepth<=currentDepth)
                shadow-=inst;
        }
    }
    if(proj.z>1.0||proj.x<0.0||proj.x>1.0||proj.y<0.0||proj.y>1.0) shadow=1.0;
    return shadow;
}

void main(){
    
    float shadow=1.0;
    vec2 uv=pixUV;
    vec3 normal=normalize(pixNormal);
    vec3 color=vec3(0);
    vec3 pix=pixColor;
    
    HARDCODED_SHADOW_COMPUTATIONS
    
    HARDCODED_NORMAL_MAP_COMPUTATIONS
    
    HARDCODED_STATIC_LIGHT_COMPUTATIONS
    HARDCODED_DYNAMIC_LIGHT_COMPUTATIONS
    
    FragColor=vec4(color*shadow,1);
}\`),1)
            D.activeTextures(m.activeTexturesArr)
            for(let i in m.shadowers)
                D.setUniform('shadowTexture_'+i,(i-0)+sc)
            for(let i in m.texture)D.setUniform('albedoTexture_'+i,i)
            if(m.normalMap)D.setUniform('normalTexture',m.texture.length)
            
        }
        Engine.InitalizeMaterial=InitalizeMaterial
        
        function InitalizeMesh(m){
            Meshes[m.name]=m
            m.data=[]
            if(m.physics.usePhysics){
                let p=m.physics,mask=1
                p.collisionMask=arrayParse(p.collisionMask)
                for(let i in p.collisionMask)mask|=Engine.cachedPowersOf2[p.collisionMask[i]]
                p.body=new CANNON.Body({
                    fixedRotation:p.fixedRotation,
                    position:new CANNON.Vec3(...m.transform.position),
                    quaternion:new CANNON.Quaternion(...quat.fromEuler([],...m.transform.rotation)),
                    mass:p.mass,
                    collisionFilterGroup:Engine.cachedPowersOf2[p.collisionGroup],
                    collisionFilterMask:mask,
                    type:CANNON.Body[p.type]
                })
            }
            m.shadowers=[]
            m.castShadowsTo=arrayParse(m.castShadowsTo)
            for(let i in Shadowers){
                if(m.castShadows||m.castShadowsTo.indexOf(i)>-1){
                    Shadowers[i].meshes.push(m)
                    m.shadowers.push(Shadowers[i])
                }
            }
            for(let i in m.children){
                let o=m.children
                if(o[i].type!=='geometry')continue
                
                if(m.physics.usePhysics&&o[i].physics.usePhysics){
                    let p=o[i].physics,a=new CANNON.Vec3(...vec3.add([],p.position,[o[i].data.x,o[i].data.y,o[i].data.z])),b=new CANNON.Quaternion(...quat.fromEuler([],...vec3.add([],p.rotation,[o[i].data.rx||0,o[i].data.ry||0,(o[i].data.rz||0)+(o[i].data.type==='cylinder'?180/o[i].data.detail:0)])))
                    switch(o[i].data.type){
                        case 'box':m.physics.body.addShape(new CANNON.Box(new CANNON.Vec3(Math.abs(o[i].data.w*0.5*p.scale[0]),Math.abs(o[i].data.h*0.5*p.scale[1]),Math.abs(o[i].data.l*0.5*p.scale[2]))),a,b)
                        break
                        case 'sphere':m.physics.body.addShape(new CANNON.Sphere(Math.abs(o[i].data.radius*p.scale[0])),a,b)
                        break
                        case 'cylinder':m.physics.body.addShape(new CANNON.Cylinder(Math.abs(o[i].data.radius*p.scale[0]),Math.abs(o[i].data.radius2*p.scale[0]),Math.abs(o[i].data.height*p.scale[1]),o[i].data.detail),a,b)
                        break
                    }
                }
                if(o[i].render){
                    o[i].data.data=arrayParse(o[i].data.data)
                    if(o[i].autoUVBounds)
                        for(let j in o[i].data.textureMapping){
                            let tm=o[i].data.textureMapping[j]
                            tm.w=tm.h=undefined
                        }
                    if(Scripts[o[i].data.obj])o[i].data.obj=Scripts[o[i].data.obj].text
                    m.data.push(o[i].data)
                }
            }
            let order=[],offset=0,mat=Materials[m.material]
            if(mat.vertexData.position)order.push('x','y','z')
            if(mat.vertexData.normal)order.push('nx','ny','nz')
            if(mat.vertexData.color)order.push('r','g','b')
            if(mat.vertexData.uv)order.push('u','v')
            
            for(let i=0,_i=0;i<mat.extraDataFormat.length;i++){
                for(let j=0;j<mat.extraDataFormat[i]-0;j++){
                    order.push('data_'+(_i++))
                }
            }
            
            let stride=order.length<<2,vertData=[],extraAttribs=[]
            
            if(mat.vertexData.position){vertData.push(['vertPos',3,stride,offset]);offset+=12}
            if(mat.vertexData.normal){vertData.push(['vertNormal',3,stride,offset]);offset+=12}
            if(mat.vertexData.color){vertData.push(['vertColor',3,stride,offset]);offset+=12}
            if(mat.vertexData.uv){vertData.push(['vertUV',2,stride,offset]);offset+=8}
            
            for(let i in mat.extraDataFormat){
                let d=mat.extraDataFormat[i]-0
                vertData.push(['vertData_'+i,d,stride,offset])
                offset+=d<<2
            }
            
            m.defaultData=arrayParse(m.defaultData)
            m.mesh=D.createMesh(D.createMeshData({meshes:m.data,order:order,defaultData:m.defaultData,wireframe:m.wireframe}),[...vertData],mat.instancedAttribs)
            if(m.physics.usePhysics){
                Engine.physics.removeBody(m.physics.body)
                Engine.physics.addBody(m.physics.body)
            }
        }
        Engine.InitalizeMesh=InitalizeMesh
        
        function InitalizeTransform(o){
            o.transform={localMatrix:D.createIdentityMatrix(),matrix:D.createIdentityMatrix(),position:o.transform.position,rotation:quat.fromEuler([],...o.transform.rotation),scale:o.transform.scale}
            if(o.type==='camera'||o.type==='shadower'){
                
                o.computeProjectionMatrix=()=>o.transform.projectionMatrix=(o.projectionType==='orthographic'?mat4.ortho(D.createIdentityMatrix(),-o.FOV*Engine.aspect,o.FOV*Engine.aspect,-o.FOV/Engine.aspect,o.FOV/Engine.aspect,o.near,o.far):D.perspectiveMatrix(o.FOV,o.type==='camera'?Engine.aspect:o.width/o.height,o.near,o.far))
                o.computeProjectionMatrix()
                
                o.transform.viewMatrix=D.createIdentityMatrix()
                
                if(o.type==='shadower'){
                    o.tex=D.createTexture(o.width,o.height,null,'NEAREST','CLAMP_TO_EDGE','DEPTH_COMPONENT32F','DEPTH_COMPONENT','FLOAT')
                    o.fb=D.createFramebuffer(o.tex,false,'DEPTH_ATTACHMENT')
                }
            }else if(o.type==='light')o.transform.direction=[0,0,-1]
        }
        Engine.InitalizeTransform=InitalizeTransform
        
        canvas.onresize=function(){
            Engine.width=canvas.clientWidth
            Engine.height=canvas.clientHeight
            Engine.camera.computeProjectionMatrix()
            D.viewport(0,0,Engine.width,Engine.height)
        }
        
        D.bindFramebuffer(null)
        
        function computeTransformations(is1stFrame){
            for(let i in AllObjects){
                let o=AllObjects[i],ot=o.transform
                if(o.script&&!is1stFrame) Scripts[o.script].onUpdate(o,Engine)
                
                if(!o.computeTransformations&&!is1stFrame)continue
                if(o.physics&&o.physics.usePhysics&&o.physics.body){
                    let b=o.physics.body
                    b.quaternion.normalize()
                    ot.position[0]=b.position.x
                    ot.position[1]=b.position.y
                    ot.position[2]=b.position.z
                    ot.rotation[0]=b.quaternion.x
                    ot.rotation[1]=b.quaternion.y
                    ot.rotation[2]=b.quaternion.z
                    ot.rotation[3]=b.quaternion.w
                }
                mat4.fromRotationTranslationScale(ot.localMatrix,ot.rotation,ot.position,ot.scale)
                
                if(o.parent)mat4.multiply(ot.matrix,o.parent.transform.matrix,ot.localMatrix);else mat4.copy(ot.matrix,ot.localMatrix)
                
                if(o.type==='camera'||o.type==='shadower'){
                    
                    mat4.multiply(ot.viewMatrix,ot.projectionMatrix,mat4.invert(ot.localMatrix,ot.matrix))
                    
                }else if(o.type==='light'){
                    
                    vec3.transformQuat(ot.direction,D.NEG_Z,ot.rotation)
                    // never-nesters fear me
                    ${(function(){
                        let s='if(o.dynamic){let idx=o.index;'
                        for(let i in data._settings.dynamicLightsInfo)
                            if(data._settings.dynamicLightsInfo[i])
                                switch(i){
                                    case 'position':
                                        s+='dynamicLightUniformArray[idx++]=ot.position[0];dynamicLightUniformArray[idx++]=ot.position[1];dynamicLightUniformArray[idx++]=ot.position[2];'
                                    break
                                    case 'rotation':
                                        s+='dynamicLightUniformArray[idx++]=ot.direction[0];dynamicLightUniformArray[idx++]=ot.direction[1];dynamicLightUniformArray[idx++]=ot.direction[2];'
                                    break
                                    case 'intensity':
                                        s+='dynamicLightUniformArray[idx++]=o.intensity;'
                                    break
                                    case 'color':
                                        s+='dynamicLightUniformArray[idx++]=o.color[0];dynamicLightUniformArray[idx++]=o.color[1];dynamicLightUniformArray[idx++]=o.color[2];'
                                    break
                                    case 'innerCone':
                                        s+='dynamicLightUniformArray[idx++]=o.innerCone;'
                                    break
                                    case 'outerCone':
                                        s+='dynamicLightUniformArray[idx++]=o.outerCone;'
                                    break
                                    case 'diffuseRemapScale':
                                        s+='dynamicLightUniformArray[idx++]=o.diffuseRemapScale;'
                                    break
                                    case 'diffuseRemapAdd':
                                        s+='dynamicLightUniformArray[idx++]=o.diffuseRemapAdd;'
                                    break
                                }
                    return s+'}'
                    })()}
                }
            }
        }
        function renderShadowMaps(is1stFrame){
            if(amountOfShadowers){
                D.useProgram(Engine.shadowMapProgram)
                D.cullFace('BACK')
                for(let i in Shadowers){
                    let sha=Shadowers[i]
                    if(!sha.computeShadowMap&&!is1stFrame)continue
                    D.bindFramebuffer(sha.fb)
                    D.clear(0,0,0,1)
                    D.viewport(0,0,sha.width,sha.height)
                    D.setUniform('viewMatrix',sha.transform.viewMatrix)
                    for(let j in sha.meshes){
                        let mes=sha.meshes[j]
                        D.setUniform('modelMatrix',mes.transform.matrix)
                        D.renderMesh(mes.mesh)
                    }
                }
                D.viewport(0,0,Engine.width,Engine.height)
            }
        }
        function MainRender(){
            D.bindFramebuffer(Engine.mainRenderOutputFB)
            
            D.clear(...Engine.camera.clearColor)
            
            Engine.uniformedPrograms={}
            Engine.lastUsedProgram=0
            for(let i in Meshes){
                if(!Meshes[i].render) continue
                if(Engine.lastUsedProgram!==Meshes[i].material){
                    Engine.lastUsedProgram=Meshes[i].material
                    D.useProgram(Materials[Meshes[i].material].program)
                    if(!Engine.uniformedPrograms[Meshes[i].material]){
                        Engine.uniformedPrograms[Meshes[i].material]=true
                        D.setUniform('viewMatrix',Engine.camera.transform.viewMatrix)
                        D.setUniform('camPos',Engine.camera.transform.matrix.slice(12,15))
                        D.setUniform('time',[Engine.time])
                        if(Engine.dynamicLightsAmount)
                            D.setUniform('dynamicLightInfoArray',dynamicLightUniformArray)
                        D.activeTextures(Materials[Meshes[i].material].activeTexturesArr)
                    }
                }
                D.setUniform('modelMatrix',Meshes[i].transform.matrix)
                D.renderMesh(Meshes[i].mesh)
            }
        }
        
        Engine.ComputeTransformations=computeTransformations
        
        for(let i in AllObjects)InitalizeTransform(AllObjects[i])
        
        computeTransformations(true)
        
        for(let i in Data._assets)
            if(Data._assets[i].type==='material'){
                Data._assets[i].name=i
                InitalizeMaterial(Data._assets[i])
            }
            
        for(let i in Meshes)InitalizeMesh(Meshes[i])
        
        for(let i in AllObjects)if(AllObjects[i].script)Scripts[AllObjects[i].script].onCreate(AllObjects[i],Engine)
        
        renderShadowMaps(true)
        
        function LOOP(now){
            Engine.time+=(Engine.deltaTime=Math.max(Math.min((now-Engine.then)*Engine.timeMultiplier,Engine.maxDeltaTime),Engine.minDeltaTime))
            
            for(let i in Pipeline)
                Pipeline[i].run()
            
            window.parent.raf=window.requestAnimationFrame(LOOP)
            Engine.then=now
        }
        if(window.parent.raf)window.cancelAnimationFrame(window.parent.raf)
        Engine.then=window.performance.now()
        LOOP(Engine.then)
        
    }catch(e){console.error(e)}}`)()
}
