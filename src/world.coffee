
FW.World = class World
  constructor : ->
    FW.bouncyFactor = 0.5
    FW.clock = new THREE.Clock()
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    @camFar = 200000
    FW.audio.masterGain.value = 1
    FW.bodies= []
    @gravity = -180

    # CAMERA
    FW.camera = new THREE.PerspectiveCamera(70.0, @SCREEN_WIDTH / @SCREEN_HEIGHT, 1, @camFar)
    FW.camera.position.set 0, 30, 80


    # @controls = new THREE.TrackballControls(FW.camera)

    # @controls.rotateSpeed = 1.0;
    # @controls.zoomSpeed = 1.2;
    # @controls.panSpeed = 0.8;

    # @controls.noZoom = false;
    # @controls.noPan = false;


    # @controls.staticMoving = true;
    # @controls.dynamicDampingFactor = 0.3;

    @initStats()


    #PHYSICS
    Physijs.scripts.worker = 'lib/physijs/physijs_worker.js';
    Physijs.scripts.ammo = 'lib/physijs/physijs/ammo.js';
    # SCENE 
    FW.scene = new Physijs.Scene()
    FW.scene.setGravity(new THREE.Vector3( 0, @gravity, 0 ));
    FW.scene.addEventListener 'update', =>
      # args: timestep, maxSubsteps
      FW.scene.simulate undefined, 2
      @physics_stats.update()
    @initSceneObjects()
    
    #LIGHTING 
    light = new THREE.DirectionalLight 0xffffff, 1
    light.position.z = 10
    FW.scene.add light

    
    # RENDERER
    FW.Renderer = new THREE.WebGLRenderer({antialias: true})
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    document.body.appendChild FW.Renderer.domElement

    # EVENTS
    window.addEventListener "resize", (=>
      @onWindowResize()
    ), false


    FW.scene.simulate()

  initSceneObjects: ->

    #Spectrum
    @spectrum = new FW.Spectrum()

    #SCREENS
    @screens = new FW.Screens()

    #FIRE
    FW.fire = new FW.Fire()

  onWindowResize : (event) ->
    @SCREEN_WIDTH = window.innerWidth
    @SCREEN_HEIGHT = window.innerHeight
    FW.Renderer.setSize @SCREEN_WIDTH, @SCREEN_HEIGHT
    FW.camera.aspect = @SCREEN_WIDTH / @SCREEN_HEIGHT
    FW.camera.updateProjectionMatrix()


  initStats: ->
    @render_stats = new Stats();
    @render_stats.domElement.style.position = 'absolute';
    @render_stats.domElement.style.top = '0px';
    @render_stats.domElement.style.zIndex = 100;
    document.body.appendChild( @render_stats.domElement );
    
    @physics_stats = new Stats();
    @physics_stats.domElement.style.position = 'absolute';
    @physics_stats.domElement.style.top = '50px';
    @physics_stats.domElement.style.zIndex = 100;
    document.body.appendChild( @physics_stats.domElement );




  render : =>
    # @spectrum.update()
    @screens.update()
    # @controls.update()
    FW.fire.update()
    @render_stats.update()
    delta = FW.clock.getDelta()
    FW.Renderer.render( FW.scene, FW.camera );



