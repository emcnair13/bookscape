/* Final Project:
 * Book-scape: De Augmentis Scientiarum
 * Eliza Mcnair
 * Edited: December 22, 2016
 * ---Book-scape---
 * A THREE.js model of a Baroque title page from Francis Bacon's "De Augmentis Scientiarum"
 
 * Book Citation: 
 
 	Bacon, Francis. "De Augmentis scientiarum: of the advancement and proficience of learning, or the partitions of sciences, IX books. Written in Latin by the most eminent, illustrious & famous Lord Francis Bacon ... Interpreted by Gilbert Wats." Oxford: Printed by Leon: Lichfield, Printer to the University, for Rob: Young, & Ed: Forrest, 1640.   Wellesley College Library, Special Collections. 

* Texture Citations: 

Book Cover Texture: http://www.onlygfx.com/wp-content/uploads/2015/11/painted-red-fabric-texture-1024x702.jpg

Ocean/Sky Texture: https://sambirkbeck.files.wordpress.com/2012/03/img_2009.jpg

Rocks Texture: https://s-media-cache-ak0.pinimg.com/originals/f1/b7/a7/f1b7a7d4b7f1d2365ffbab5765f02ea6.jpg

Page Texture: http://media.istockphoto.com/photos/old-book-paper-background-macro-of-spine-pages-folded-stack-picture-id488557061?k=6&m=488557061&s=170667a&w=0&h=9BDFOi9fPUl0KwMXhW1Nrq73aeHzMCaElxmKuKL9_Xw=

Sun Texture: http://www.solarsystemscope.com/nexus/content/planet_textures/texture_sun.jpg

Earth Texture: https://svs.gsfc.nasa.gov/vis/a000000/a003600/a003615/flat_earth_Largest_still.0330.jpg

Constellation Texture: https://s-media-cache-ak0.pinimg.com/originals/e0/7d/5c/e07d5c0c69ea684e8260fabe1d176ceb.gif

Moon Texture: http://iss-transit.sourceforge.net/j2ee-consultants/WorldView/moon2048x1024.jpg

Feather Body Texture: https://s-media-cache-ak0.pinimg.com/originals/88/a1/cd/88a1cd5bb42c567e5032c113c4baa0ea.jpg

Feather Wing Texture: http://ww2.kqed.org/science/wp-content/uploads/sites/35/2015/10/owl-feather-and-wing-800x450.jpg
*/ 

/* createBookSpace() -- Main method of the JS file: Used to create the complete book-scape/scene. Calls several helper methods defined below to create different features. Returns one Object3D containing all individual elements. Takes no parameters, as the book-scape is not modifiable. */ 
function createBookSpace() {
    // Container for all scene elements. 
    var bookSpace = new THREE.Object3D(); 
    
    /* Parameter list used to maintain relative sizing between elements. */
    var bookParams = {
        // Parameters dictating how large the primary architectural features are: 
        // Hemisphere/Dome, Path, Columns, etc. 
        spaceX: 200,
        spaceY: 400, 
        spaceZ: 1600,
        spaceSegs:100,
  
        // Parameters used to define the books that appear in stacks as part of the columns: 
        numBooks: 3,
        bookHeight: 10,
        whSegs: 20, 
        
        // Parameters for celestial system: 
        
        // Planet radii: 
        sunRad: 50,
        moonRad:30,
        esRad:40,
        
        // Planet rotation "speeds": 
        deltaLunar: -Math.PI/64,
        deltaTerra: Math.PI/64,
        deltaSolar: -Math.PI/128,
        
        // Paricle System parameters (based on Dirksen's Chp. 7 method):
        partSize: 10,
        numRings:35,
        transparent: true,
        opacity: 1,
        sizeAttenuation: true,
         
        // Parameters for Owl:
        owlScale: 1.25, 
        owlBase: 40,
        owlStartHeight: 185,
        owlStartDepth: -1760
    };
    
    // Sets up colors and materials used in the various book-scape elements:
    
    // Colors: 
    var pageColor = new THREE.Color( 0xf9efe5);
    var whiteColor = new THREE.Color( 0xFFFFFF);
    var sandColor = new THREE.Color( 0xc2b280 );
    var redColor = new THREE.Color( 0xa51324 );
    var skyColor = new THREE.Color( 0xdef8f9 );
    var yellowColor = new THREE.Color ( 0xf7e307 );
    var blackColor = new THREE.Color ( 0x000000 ); 

    var colors = [pageColor, whiteColor, sandColor, redColor, skyColor, yellowColor, blackColor];
        
    // Textures:
    var textureMats = [];
    // loads the textures and stores them in textureMats:
    // uses the base colors in treeColorMats (above):
    
    /* Loads all image files necessary to create the textures used in the scene, then adds instructions to an anonymous function that calls several helper methods, applying the loaded textures to each element as appropriate. The anonymous function, while long and not particularly modular, encompasses the complete book-scape. */ TW.loadTextures(['images/deaugmentistitle.jpg', 'images/rocks.jpg', 'images/rocksBump.jpg', 'images/triWall.jpg', 'images/triWallBump.jpg', 'images/sky.jpg', 'images/book_texture.jpg','images/sun.jpg', 'images/star.png', 'images/earth.jpg', 'images/moon.jpg', 'images/sparkle.png', 'images/wing.jpg', 'images/feathers2.jpg', 'images/oceanfloor.jpg', 'images/oceanfloorBump.jpg', 'images/page.jpg'],
        function (textures) {
            // Loads all necessary textures for the constructor functions: 
            // Sets their repeat wrapping in the s and t directions to: 
            // 1 x 1 
            for (var i = 0; i < 14; i ++) {
                textures[i].wrapS = THREE.RepeatWrapping;
                textures[i].wrapT = THREE.RepeatWrapping;
                textures[i].repeat.set(1,1);
            }
        
            // and 2 x 2: 
            /* These textures are set to MirrorRepeatWrapping in an effort to smooth the transitions in the ocean water and pages. */
            for (var i = 14; i <= 16; i ++) {
                textures[i].wrapS = THREE.MirrorRepeatWrapping;
                textures[i].wrapT = THREE.MirrorRepeatWrapping;
                textures[i].repeat.set(2,2);
            }
        
            /* All textures are MeshPhongMaterials, and are FrontSide (i.e. planets, so you can't see their interior if the camera is positioned where a planet will pass directly on it), DoubleSide (i.e. owl, path, temple, etc.), or BackSide (i.e. the dome) as approporiate. Each texture is paired with a color from the color array defined above, and all rock, feather, and ocean features are bump mapped, as well. */ 
        
            // Title Page Texture: 
            textureMats.push(new THREE.MeshPhongMaterial({ map: textures[0], color: colors[0], side: THREE.FrontSide}));
            
            // Rect. Rock Texture: 
            textureMats.push(new THREE.MeshPhongMaterial({ map: textures[1], color: colors[2], side: THREE.DoubleSide, bumpMap: textures[2], bumpScale: 5}));
        
            // Tri. Wall Texture: 
            textureMats.push(new THREE.MeshPhongMaterial({ map: textures[3], color: colors[2], side: THREE.DoubleSide, bumpMap: textures[4], bumpScale: 5}));
        
            // Sky Texture: 
            textureMats.push(new THREE.MeshPhongMaterial({ map: textures[5], color: colors[1], side: THREE.BackSide}));
         
            // Ocean Texture: 
            textureMats.push(new THREE.MeshPhongMaterial({ map: textures[14], color: colors[1], specular: whiteColor, shininess: 10, side: THREE.DoubleSide, bumpMap: textures[15], bumpScale: 5}));
        
            // Book Pages Texture: 
            textureMats.push(new THREE.MeshPhongMaterial({ map: textures[16], color: colors[0], side: THREE.DoubleSide}));
        
            // Cover Texture: 
            textureMats.push(new THREE.MeshPhongMaterial({ map: textures[6], color: colors[3], side: THREE.DoubleSide}));
        
            // Sun Texture: 
            textureMats.push(new THREE.MeshPhongMaterial({ map: textures[7], color: colors[1], side: THREE.FrontSide}));
        
            // Constellation Texture: 
            textureMats.push(new THREE.MeshPhongMaterial({ map: textures[8], color: colors[1], side: THREE.FrontSide}));
        
            // Earth Texture: 
            textureMats.push(new THREE.MeshPhongMaterial({ map: textures[9], color: colors[1], side: THREE.FrontSide}));
        
            // Moon Texture: 
            textureMats.push(new THREE.MeshPhongMaterial({ map: textures[10], color: colors[1], side: THREE.FrontSide}));
        
            // Feather Texture: 
            textureMats.push(new THREE.MeshPhongMaterial({map: textures[12], color: colors[2], side: THREE.DoubleSide, bumpMap: textures[2], bumpScale: 5}));
        
            // Feather Body Texture: 
            textureMats.push(new THREE.MeshPhongMaterial({map: textures[13], color: colors[2], side: THREE.DoubleSide, bumpMap: textures[2], bumpScale: 5}));
        
            /* Sparkle Texture: additional parameters specified in Dirsken's Chapter 7 example function. Uses transparency, blending, and depth to improve the realism of the points as stars. Citation: modified from source --> http://cs.wellesley.edu/~cs307/threejs/dirksen/chapter-07/07-snowy-scene.html. */
            textureMats.push(new THREE.PointsMaterial({size: bookParams.partSize, transparent: bookParams.transparent, opacity: bookParams.opacity, map: textures[11], blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: bookParams.sizeAttenuation, color: colors[5]}));
    
            //console.log("all textures loaded") ;
        
            
            /* Textures: assigns all textures materials in the array a variable name, to make them easily identifiable and callable in the various helper method used below. */
            var pageText = textureMats[0];
            var pathText = textureMats[1];
            var triWallText = textureMats[2];
            var skyText = textureMats[3];
            var oceanText = textureMats[4];
            var paperText = textureMats[5];
            var coverText = textureMats[6];
            var sunText = textureMats[7];
            var starsText = textureMats[8];
            var earthText = textureMats[9];
            var moonText = textureMats[10];
            var featherWingText = textureMats[11];
            var featherBodyText = textureMats[12];
            var sparkleText = textureMats[13];
           
        
            // ColorMats (used for the owl):
            var goldMat = new THREE.MeshPhongMaterial({color: colors[5], specular: colors[1], shininess: 5, side:THREE.DoubleSide, bumpMap: textures[2], bumpScale: 5});
            var blackMat = new THREE.MeshPhongMaterial({color: colors[6], specular: colors[1], shininess: 20, side:THREE.DoubleSide, bumpMap: textures[2], bumpScale: 5});
                    
            /* Construct Scene: Calls the helper method makeSpace() - defined below - to create the book-scape hemisphere and page, then to orient them in space so that the front of the hemisphere is shifted down in the negative y directin. */
            var space = makeSpace((bookParams.spaceZ*(2/3)), bookParams.spaceSegs, pageText, skyText, oceanText);
            space.position.y = -(bookParams.spaceY/2);
            bookSpace.add(space);
        
            /* Directional Light Source: In addition to the ambient light source defined in the HTML file, a directional light source is created and added in front of the page (part of 'space', defined above. The directional light is white, and of intensity 0.6 so that the page is well lit without creating too extreme a glare. The target, defined directly below, is placed at z = 0 and approximately halfway up the front facing page in the positive y direction. Light from this srouce seeps slightly back into the hemisphere, although its purpose is primarily to show the detail on the original title page. */ 
            var direcColor = whiteColor;
            var directionalLight = new THREE.DirectionalLight(direcColor, 0.6);
            directionalLight.position.set(0,0,(bookParams.spaceZ/2));

            /* Creates a 'target' object for the directional light using a THREE.Object3D and a THREE.Vector3 */
            var direcTarget = new THREE.Object3D();
            direcTarget.position = new THREE.Vector3(0, (bookParams.spaceY/2), 0);
            directionalLight.target = direcTarget;
            bookSpace.add(directionalLight);

            
            /* Additional Architecture Measurements: defined using the original space params defined in bookParams above. These parameters specify measurments for the path, columns, temple - created with makePath() and makeColumn1(). The parameters baseWidth, baseHeight, and colShift are specifically for the columns. */ 
            var pathWidth = bookParams.spaceX*(2/5);
            var colShift = bookParams.spaceX*(3/10);
            var baseWidth = (bookParams.spaceX*(1/5));
            var baseHeight = (bookParams.spaceY*(1/7));
            var pathL = (bookParams.spaceZ);
            var ballRad = (bookParams.spaceX*(1/30));
        
            /* Defines the path, which encompasses both the rectangular cubed pathway itself as well as the temple at the end of the road - see makePath() below. The path is positioned so that its base rests on the base of the hemisphere and so that it begins at z = -1 before extending in the negative z direction. The -1 placement is to avoid a flickering effect between the front facing page and the path if they overlapped one another on the z = 0 plane. */
            var path = makePath(pathWidth, baseHeight, pathL, pathText, bookParams.whSegs, bookParams.numBooks);
            path.position.y = -(bookParams.spaceY/2);
            path.position.z = -1;
            bookSpace.add(path);
        
            /* Creates and adds columns along the left and right sides of 'path' (defined above) so that there exists one column distance between every two columns. This is achieved by first establishing the number of columns that could fit if they were placed directly beside each other - 'numCol' - then updating the counter used to build each column by two with each iteration of the construction for-loop below. The columns are positioned so that they rest directly on the left and right sides of the path (via 'colShift'), their base is the same as the base of the hemisphere, and an additional i*baseWidth distance back from the original z = -1 each pass through the for-loop. */ 
            var numCol = pathL/baseWidth;
            for (i = 1; i < numCol; i=i+2) {
                // Left side columns: 
                var col1 = makeColumn1(baseWidth, baseHeight, ballRad, pathText, triWallText, paperText, coverText, bookParams.numBooks, bookParams.bookHeight, bookParams.whSegs);
                col1.position.set(-colShift,-(bookParams.spaceY/2),-1-(i*baseWidth));
                bookSpace.add(col1);
                
                // Right side columns:
                var col2 = makeColumn1(baseWidth, baseHeight, ballRad, pathText, triWallText, paperText, coverText, bookParams.numBooks, bookParams.bookHeight, bookParams.whSegs);
                col2.position.set(colShift,-(bookParams.spaceY/2),-1-(i*baseWidth));
                bookSpace.add(col2);
            }
        
            /* Creates and adds an owl to the end of the path using makeOwl(), defined below, and positions the owl so that it rests on the roof of the temple (part of 'path') within the scene. The owl is animated using several functions defined in makeOwl() called from the animation methods defined below the celestial bodies. The owl is written to fly "up" and "forward" (+y and +z) as it's wing's extend, and "down" and "back" (-y and -z) as it's wing's contract. See makeOwl() and it's helper methods below for construction and animation details. */ 
            var owlMain = makeOwl(featherBodyText, featherWingText, goldMat, blackMat, bookParams.whSegs, bookParams.owlScale, bookParams.owlBase, bookParams.owlStartHeight, bookParams.owlStartDepth);
            owlMain.position.set(0,bookParams.owlStartHeight,bookParams.owlStartDepth);
            bookSpace.add(owlMain); 
            
        
            // Celestial System: 
            /* Creates first four Object3D containers that are nested together to establish the rotations of the four planets in the scene. The Object3Ds are: solar, terra, earthSystem, and lunar - lunar contains the moon; terra the two worlds and lunar; earthSystem holds terra and the starSystem; and solar contains the sun and earthSystem. Solar, the frame at the top of the hierachy defined below, is added to the bookSpace. */
            var solar = new THREE.Object3D(); 
            var terra = new THREE.Object3D(); 
            var earthSystem = new THREE.Object3D(); 
            var lunar = new THREE.Object3D(); 
        
            /* The positions of solar, earthSystem, and lunar are set so that, when nested and added to the scene, the sun will orbit in the center of the hemisphere on a circle of its own radius defined in bookParams, 'sunRad'; the earthSystem (the two worlds and lunar) will be 1/3 of the path distance away from the sun in the X direction; and the moon will be an additional world radius away from the two worlds. The formation of the four bodies forms a strangely proportioned cross that looks something like: 
                   |
            ---------
                   |
            with the sun at the base, the moon at the tip, and the worlds at the two vertical (in above) extensions. */
            solar.position.set(0, (bookParams.spaceY/2), -(2*bookParams.spaceZ/3)+bookParams.sunRad);
            earthSystem.position.set(-(pathL*(1/3)), 0, 0);
            lunar.position.x = -(bookParams.esRad);
        
            /* Creates the sun using the helper makeCelestialBody() method, then places the sun slightly to the left (negative x direction) in the solar frame. */ 
            var sun = makeCelestialBody(bookParams.sunRad, bookParams.whSegs, sunText);
            sun.position.x = -((bookParams.spaceX/2)); 
            solar.add(sun);
        
            /* Spotlight Source: In addition to the ambient and directional light sources, the spotlight created below is placed in the center of the sun (in the same position within the solar frame) and set so that it illuminates half of the circle (Math.PI/2 in both directions), creating the illusion of "day time". The spotlight is skyColor, a light blue defined above, so that the specular glares it generates are more natural looking than a white spotlight would produce. */ 
            var spotlight = new THREE.SpotLight(skyColor, 3, bookParams.spaceZ);
            spotlight.angle = Math.PI/2;
            spotlight.position.set(-((bookParams.spaceX/2)), 0, 0);

            // Sets the spotlight's target to be the origin (of the solar frame). 
            var spotTarget = new THREE.Object3D();
            spotTarget.position.set(0, 0, 0);

            solar.add(spotTarget);
            solar.add(spotlight);

            spotlight.target = spotTarget;

            /* Creates the moon using the helper makeCelestialBody() method, then places the moon in the lunar frame slightly forwards in the positive z direction. */
            var moon = makeCelestialBody(bookParams.moonRad, bookParams.whSegs, moonText);
            moon.position.z = (pathL*(1/10));
            lunar.add(moon);
        
            /* Creates a sparkle system using the modified createSystem() method borrowed from Dirksen and a graphic of a sparkle/star. The createSystem() method is modified below so that it generates particles using spherical coordinates, populating half of the hemisphere (the half not illuminated by the spotlight) with stars. The system is rotated and placed so that it fills the portion of hte hemisphere not currently illuminated, then is added to the solar frame. */ 
            var sparkleSystem = createSystem("sparkles", sparkleText, bookParams.partSize, (bookParams.spaceZ*(2/3)-bookParams.sunRad-1), bookParams.numRings, yellowColor);
        
            sparkleSystem.rotation.y = -Math.PI/2;
            sparkleSystem.position.y = -(bookParams.spaceZ/4);
            solar.add(sparkleSystem);

            /* Creates the visible world, 'visibilis' (Texture Mapping --> Earth) using the helper makeCelestialBody() method, then places the world in the terra frame the same distance to the left (negative x direction) as the sun is shifted in the solar frame, plus the distance of its radius. This radial shift is meant to separate the two world from one another and to set up their rotation. */
            var visibilis = makeCelestialBody(bookParams.esRad, bookParams.whSegs, earthText);
            visibilis.position.x = (-((bookParams.spaceX)/2)+bookParams.esRad);
            terra.add(visibilis);

            /* Creates the intellectual world, 'intellectualis', (Texture Mapping --> Constellation Map) using the helper makeCelestialBody() method, then places the world in the terra frame the same distance to the left (negative x direction) as the sun is shifted in the solar frame, minus the distance of its radius. This radial shift is meant to separate the two world from one another and to set up their rotation. */
            var intellectualis = makeCelestialBody(bookParams.esRad, bookParams.whSegs, starsText);
            intellectualis.position.x = (((bookParams.spaceX)/2)-bookParams.esRad);
            terra.add(intellectualis);
        
            /* The lunar frame is added to the terra frame, then terra is added to the earthSystem, then earthSystem is added to solar. This nesting of the objects sets up their individual and collective rotations. The solar system is then added to bookSpace. */
            terra.add(lunar); 
            earthSystem.add(terra); 
            solar.add(earthSystem);
        
            bookSpace.add(solar);
            
        
            /* ANIMATION: The rotation the solar system and the animation of the owl system are both set up below in the animation methods, taken and modified from the in class Mass-Spring Example. While the updateSpaceState() method defined below shows how the solar system changes as time passes, the corresponding updateOwlState() method is actually defined in the makeOwl() method. The oneOwlStep(), startOwlUp(), and startOwlDown() method defined below each use methods specific to an owl object, generated using makeOwl(), to sync the owl's animation with the solar system's animation. */ 
            
            // CELESTIAL ANIMATION:
        
            /* Sets up the animation state with four counters, timeSolar, timeTerra, timeLunar, and timeOwl, that are updated by either the updateSpaceState() or updateOwlState() method and used to dictate the speed of the different elemetns of the animation. All counters are initially set to 0, and calling the resetAnimationState() method will reset these values (and, it follows, the animation). */
            function resetAnimationState() {
                state = {
                    timeSolar: 0,
                    timeTerra: 0,
                    timeLunar: 0,
                    timeOwl: 0
                };
            }
        
            /* The resetOwlClock() method is used to reset the owl time counter without affecting the solar system counters. This is necessary because the solar system animation runs continuously while the two owl animations, rising up and lowering down, are updated by the same method, which depends on 'timeOwl' beginning at 0. The startOwlUp() and startOwlDown() method defined below call resetOwlClock() before using the owl functions to start the animation. */
            function resetOwlClock() {
                state.timeOwl = 0; 
            }

            resetAnimationState();
        
            /* The firstAnimationState() method resets the animation frame and renders the scene. */
            function firstAnimationState() {
                resetAnimationState();
                render();
            }

            /* The updateSpaceState() method updates each solar time counter by the apropriate number of radians, defined as deltaLunar, deltaTerra, and deltaSolar in bookParams above; saves these three new values; then updates the rotation of 'lunar' in the x direction, of 'terra' in the z direction, of 'solar' in the y direction, of 'visibilis' in the y direction, and of 'intellectualis' in the y direction. The net result of these rotations is that both worlds rotate on their owl axes, lunar rotates around the two worlds, the complete terra system rotates so the two worlds circle each other, and the entire system rotates around the center of the hemisphere. */
            function updateSpaceState() {
                // Rotates the appropriate system or planet by some angle defined in the params
                state.timeLunar += bookParams.deltaLunar;
                var deltaL = state.timeLunar;
                
                state.timeTerra += bookParams.deltaTerra;
                var deltaT = state.timeTerra;
                
                state.timeSolar += bookParams.deltaSolar;
                var deltaS = state.timeSolar;
                
                lunar.rotation.x = deltaL;
                terra.rotation.z = deltaT; 
                solar.rotation.y = deltaS; 
                visibilis.rotation.y = deltaS; 
                intellectualis.rotation.y = deltaS; 
            }
            
            // Moves the solar system one step forwards: 
            function oneSpaceStep(){
                updateSpaceState();
            }
        
            /* Moves the owl system one step forwards using he updateOwlState() method and the current value of timeOwl before updating timeOwl. */
            function oneOwlStep(){
                owlMain.updateOwlState(state.timeOwl); 
                state.timeOwl ++; 
            }
        
            /* The startOwlUp() method is associated with a keypress event defined below - this is the method that the user activates to modify how updateOwlState() is working and to cause the owl to rise. Uses the owl method goUp(). */
            function startOwlUp() {
                resetOwlClock(); 
                owlMain.goUp(); 
            }
        
            /* The startOwlDown() method is associated with a keypress event defined below - this is the method that the user activates to modify how updateOwlState() is working and to cause the owl to lower. Uses the owl method goDown(). */     
            function startOwlDown() {
                resetOwlClock(); 
                owlMain.goDown(); 
            }
 
            // Would allow the user to cancel the animation, but that capability is disabled below. 
            var animationId = null;                

            // The animate() method uses the two step functions to animate the solar system and owl. 
            function animate(timestamp) {
                oneSpaceStep();
                oneOwlStep(); 
                animationId = requestAnimationFrame(animate);
            }

            // The stopAnimation() method could be used to stop the animation if the option wasn't disabled below. 
            function stopAnimation() {
                if( animationId != null ) {
                    cancelAnimationFrame(animationId);
                }
            }
        
            animate(); 
        
            /* Set up Event Listener: keyPress - The disables keys are those that would give the user a modicum of control over the solar system. Though an argument could be made for leaving that capability available, I chose to remove the option to control the scene because the book-scape is meant to be immersive. Also, you cannot stop the passage of time, therefore you cannot stop the day/night animation.The two keyPress events left enabled in this file are those that call startOwlUp() and startOwlDown() to animate the owl. WARNING: The only way I currently know that the program can be crashed is if 'r' or 't' is pressed while the owl is already in motion. */ 
            document.addEventListener('keypress', onKeyPress );
        
            function onKeyPress(event) {
               var key = event.keyCode;
               var ch = String.fromCharCode(key);
               switch(ch) {
                    // case '0': firstSpaceState(); break;
                    // case '1': oneSpaceStep(); break;
                    // case 'f': animate(); break;
                    // case 'h': stopAnimation(); break;
                    case 'r': startOwlUp(); break
                    case 't': startOwlDown(); break
                    default:
                    //console.log("key "+ch+" is not handled");
                }
            }

        }); // end of loadTextures() callback.
    
    // End of the createBookSpace() method - returns the bookSpace created. 
    return bookSpace;
}

// HELPER METHODS: 

/* Borrows the helper function from Assignment 5 (written by prof.) and modified it slightly that it adds texture coordinates to the six face of the path rather than the nine faces of a barn geometry. */
function addTextureCoords(pathGeom) {
    if( ! pathGeom instanceof THREE.Geometry ) {
        throw "not a THREE.Geometry: "+pathGeom;
    }
    // array of face descriptors
    var UVs = [];
    function faceCoords(as,at, bs,bt, cs,ct) {
        UVs.push( [ new THREE.Vector2(as,at),
                    new THREE.Vector2(bs,bt),
                    new THREE.Vector2(cs,ct)] );
    }
    // Right Side Face: 
    faceCoords(0,0, 1,0, 0,16);
    faceCoords(1,0, 1,16, 0,16);

    // Left Side Face:
    faceCoords(0,0, 1,0, 0,16);
    faceCoords(1,0, 1,16, 0,16);
            
    // Roof Face: 
    faceCoords(0,0, 8,0, 0,1);
    faceCoords(8,0, 8,1, 0,1);
            
    // Floor Face: 
    faceCoords(0,0, 8,0, 0,1);
    faceCoords(8,0, 8,1, 0,1);
            
    // Front Face:
    faceCoords(0,0, 1,0, 0,1);
    faceCoords(1,0, 1,1, 0,1);
            
    // Back Face:
    faceCoords(0,0, 1,0, 0,1);
    faceCoords(1,0, 1,1, 0,1);
            
    // Update the geometry... HOORAY!
    pathGeom.faceVertexUvs = [ UVs ];
}

/* The makeSpace() method creates the hemisphere environment and the page using half of a SphereGeometry object and a PlaneGeometry object. The method takes a radius and width/height segment value to create the sphere, as well was textures for the title page, sky, and ocean. Returns the hemisphere and page together in a Object3D container. */ 
function makeSpace(spaceRad, spaceSegs, textPage, textSky, textOcean){
    var space = new THREE.Object3D();
    
    /* Generates the hemisphere geometry (radians 0 to Math.PI) and mesh (with the sky texture), then positions the hemisphere so that it begins at z = 0 and extends in the negative z direction and rotates it so that it rests on it's empty base. This is the sky. Adds the hemisphere to the space container. */
    var spaceGeom = new THREE.SphereGeometry(spaceRad, spaceSegs, spaceSegs, 0, Math.PI); 
    var spaceMesh = new THREE.Mesh(spaceGeom, textSky);  
    spaceMesh.position.set(0,0,-spaceRad);
    spaceMesh.rotation.x = -(Math.PI/2); 
    space.add(spaceMesh);
    
    /* Generates the circular base geometry of the hemisphere, then creates a mesh with the ocean texture. Positions the mesh so that it rests directly underneath the hemisphere. This is the ocean. Adds the circular base to the space container. */ 
    var groundGeom = new THREE.CircleGeometry(spaceRad, spaceSegs); 
    var groundMesh = new THREE.Mesh(groundGeom, textOcean);
    groundMesh.position.set(0,0,-spaceRad);
    groundMesh.rotation.x = -(Math.PI/2); 
    space.add(groundMesh); 
    
    /* Generates the plane geometry and mesh (with the page texture) so that it is as tall as the hemisphere and a quarter its width (or half it's radius). Positions the mesh so that it stands directly in front of the hemisphere on the z = 0 plane, centered at x = 0 and resting on the y = 0 plane. Adds the page to the space container. */
    var pageGeom = new THREE.PlaneGeometry((spaceRad/2), spaceRad); 
    var pageMesh = new THREE.Mesh(pageGeom, textPage); 
    pageMesh.position.set(0, (spaceRad/2), 0);
    space.add(pageMesh);
    
    return space;
}

/* The makePath() method takes three measurments, the path's width, height, and depth, as well as a texture to be mapped onto it, a width/height segment count, and a number of bases to be added to the temple at the end of the path. Returns an Object3D containing the path and temple. */
function makePath(pathX, pathY, pathZ, pathText, whSegs, numBases) {
    var path = new THREE.Object3D();

    /* Creates the path geometry and mesh using a BoxGeometry and the addTextureCoords() helper method defined above to map the path texture onto each of its sides. Positions the path so that its base is on the y = 0 plane, its front is at the z = 0 plane, and it extends backwards in the negative z direction. Adds the path to the Object3D container. */
    var pathGeom= new THREE.BoxGeometry(pathX, pathY, pathZ);
    addTextureCoords(pathGeom);
    // [wall, wall, roof, floor, wall, wall];
    var pathTextures = [pathText, pathText, pathText, pathText, pathText, pathText];
    var pathMesh = new THREE.Mesh(pathGeom, new THREE.MeshFaceMaterial(pathTextures));
    pathMesh.position.set(0,(pathY/2),-(pathZ/2));
    path.add(pathMesh);
    
    /* Sets up a series of variables and counters that are used to construct the temple at the end of the path. Scale dictates how the stacked bases change, while countHeight and currRad are updated throughout the for loops so that each element (base or column) of the temple is positioned correctly in the x and y directions. */
    var scale = (1/8);
    var countHeight = 0;
    var currRad = 0;
    
    /* Generates the appropriate number of bases for the temple using CylinderGeometries that progressively reduce in radial size using the scale variable able and the value of level, the for loop counter. The CylinderGeometries are made into Mesh objects, then stacked so that the bottom base rests on the y = 0 plane and each successive base rests on top of the base preceeding it. The z position of each base is modified so that the bases of smaller radii are each placed shifted forwards (in the positive z direction) so each base is centered at the same point. Adds the bases to the Object 3D container. */
    for (level = 0; level < numBases; level++) {
        var factor = scale*level;
        var baseRad = pathX*2; 
        currRad = baseRad-(factor*baseRad);
        
        var baseHeight = pathY/2; 
        var currHeight = baseHeight -(factor*baseHeight);
        countHeight = countHeight + currHeight; 
        
        var baseGeom = new THREE.CylinderGeometry(currRad, currRad, pathY, whSegs, whSegs); 
        var baseMesh = new THREE.Mesh(baseGeom, pathText); 

        baseMesh.position.set(0,countHeight,-(pathZ+(baseRad)));
        path.add(baseMesh);
    }
    
    /* Creates an additonal Object3D container that will hold all of the columns involved in the temple. This Object3D was created so that the columns could be easily rotated an appropriate number of radians as the for loop generating them is rotated. Calls the makeColumn2() method in each iteration of the for loop, positioning a new column in an Object 3D called rotor the current radius backwards in the negative z direction. Once the column is added to rotor, rotor is rotated by its for loop counter value. The net result is that the columns wrap around the top base of the temple, leaving a gap that opposite the path. */
    var structure = new THREE.Object3D(); 
    for (colR = 2*Math.PI/12; colR < 22*Math.PI/12; colR = colR + Math.PI/12) {
        var rotor = new THREE.Object3D(); 
        var col = makeColumn2(currRad/3, pathY, whSegs, pathText, currRad);
        
        col.position.set = -currRad; 
        rotor.add(col); 
        rotor.rotation.y = colR;
        
        structure.add(rotor);
    }
    
    /* 'structure' is rotated so that the temple now opens onto the path, and is positioned on top of the highest base before it is added to the Object3D container. */
    structure.rotation.y = Math.PI; 
    structure.position.set(0,countHeight,-(pathZ+(baseRad)));
    path.add(structure); 
    
    /* Creates a roof geometry and mesh from a CylinderGeometry and the path texture that is placed on top of the columns. This geometry is a cylindrical pyramid. The roof is then added to the Object3D container. */
    var roofGeom = new THREE.CylinderGeometry(0, currRad*(4/3), currHeight*2, whSegs, whSegs); 
    var roofMesh = new THREE.Mesh(roofGeom, pathText); 
    var colHeight = 2*((13/4)*baseHeight)+4; 
    roofMesh.position.set(0,(countHeight+colHeight+currHeight),-(pathZ+(baseRad)));
    path.add(roofMesh); 
    
    return path; 
}

/* The makeColumn1() method takes measurments for the bases as well s for the radius of the ball features; a width/height segment count; and textures for the book cover, book pages, four-sided cylindrical cones (triangular wall texture), and box or sphere geometry objects (rectangular wall texture). The column returned is contained in an Object3D, and each element is stacked on top of the previous so that the base of the column sits on the y = 0 plane and grows in the positive y direction. These columns are the columns that run along the sides of the path in the book-scape, and are meant to mimic the columns in the original title page. */
function makeColumn1(baseWidth, baseHeight, ballRad, textStone, textPoint, textPage, textCover, numBooks, bookHeight, whSegs) {
    var col = new THREE.Object3D(); 
    
    /* Creates the base geometry and mesh using a BoxGeometry and positions the base so that its rests 5 units above the y = 0 plane, its front is at the z = 0 plane. The 5 units are accounted for in the for-loop below, and the base is added to the column container 'col'. */
    var baseGeom= new THREE.BoxGeometry(baseWidth, baseHeight, baseWidth);
    var baseMesh = new THREE.Mesh(baseGeom, new THREE.MeshFaceMaterial([textStone, textStone, textStone, textStone, textStone, textStone]));
    baseMesh.position.set(0,(baseHeight/2)+5,-(baseWidth/2));
    col.add(baseMesh);
    
    /* Creates the two geometry/mesh objects using a BoxGeometry That are positioned directly above and below the base. These extend 2 units past each edge of the base in the x and z directions and are 5 units tall. These features are added to the column container 'col'. */
    for (i=0; i<=1; i++) {
        var colGeom= new THREE.BoxGeometry(baseWidth+2, 5, baseWidth+2);
        // [wall, wall, roof, floor, wall, wall];
        var colTextures = [textStone, textStone, textStone, textStone, textStone, textStone];
        var colMesh = new THREE.Mesh(colGeom, new THREE.MeshFaceMaterial(colTextures));
        
        colMesh.position.set(0, 5+(i*baseHeight),-(baseWidth/2));
        col.add(colMesh);
    }
    
    // Sets up a height counter for the column that will be used to place each subsequent element. 
    var currHeight = baseHeight+10;
    
    /* Calls the helper method (defined below) makeStack() that creates a stack of books using the page and cover textures. The stack is then placed on top of the base using the currHeight counter. */
    var bookStack = makeStack(numBooks, baseWidth+10, 10, baseWidth+10, textPage, textCover, whSegs);
    bookStack.position.set(0,currHeight,-(baseWidth/2));
    col.add(bookStack);
    
    /* The height contribution of the book stack is calculated and added to the column height counter given that 'numBooks' were added and that each book is a total of 13 units high. The current width of the column is also calculated using the shrink factor of the stack of books, the number of books, and the dimension of the books. This measure is used below to create and place the first four spheres in the column, on which the 4-sided cone rests. */
    var stackContrib = (numBooks*13);
    var currHeight = currHeight + stackContrib; 
    var currWidth = ((baseWidth+10)-((numBooks*(1/8)*(baseWidth+10))))+(numBooks*2);
    
    /* Add base spheres by first calculating the distance the spheres will need to be shifted in the x and z directions so that they are in each of the four corners. The xs and zs arrays are used in the for loop to shift the spheres into the four "quadrants" of the square surfaced they're placed on. */
    var sphereDistFromSide = (currWidth/2)-ballRad; 
    var xs = [1,1,-1,-1];
    var zs = [1,-1,1,-1];
    
    /* Generates four SphereGeometry/Mesh objects, and places them into the corners of the column so that they rest on top of the book stack and their edges match the edges in the x and z directions (excluding the spines of the books, which extend past the square). Adds the spheres to the col container, then updates the current height counter. */
    for (j=0; j < 4; j++) {
        var sphereGeom = new THREE.SphereGeometry(ballRad, whSegs, whSegs);
        var sphereMesh = new THREE.Mesh(sphereGeom, textStone); 
        sphereMesh.position.set((xs[j]*sphereDistFromSide), currHeight + ballRad, -(currWidth/2)+(zs[j]*sphereDistFromSide)-(ballRad/2));
        col.add(sphereMesh);
    }
    
    currHeight = currHeight + (2*ballRad);
    
    /* Generates and adds a four sided cylindrical cone to the column that rests directly on top of the four spheres. Uses the current width measurement to shape the base of the cone an to calculate an appropriate height (four times the length of the base). Uses the triangular wall texture provided to improve the quality of the texture mapping. The cylinder is rotated Math.PI/4 radians around the y-axis so that the corners of the cone are each over one of the spheres. The cone is added to the column, and the height contribution of the cone is calculated and added to the height counter. */
    var pointGeom = new THREE.CylinderGeometry(0, (currWidth/2), (currWidth*4), 4, 4);
    var pointMesh = new THREE.Mesh(pointGeom, textPoint);
    
    pointMesh.rotation.y = Math.PI/4; 
    
    pointMesh.position.set(0, currHeight + (2*currWidth), -(baseWidth/2));
    col.add(pointMesh);
    
    var pointContrib = 4*currWidth; 
    currHeight = currHeight + pointContrib; 
    
    /* Creates one more sphere geometry/mesh object with identical measurments to the spheres added below the cone and places it on the top of the cone so that the point of the cone is at the center of the sphere. Adds the sphere to the col container. */
    var sphereGeom = new THREE.SphereGeometry(ballRad, whSegs, whSegs);
    var sphereMesh = new THREE.Mesh(sphereGeom, textStone); 
        
    sphereMesh.position.set(0,currHeight,-(baseWidth/2));
    col.add(sphereMesh);

    return col; 
}

/* The makeColumn2() method takes measurments for the bases of the column, as well for the radius of the base that the column will rest on so that the column can be shifted appropirately; a width/height segment count; and a texture for the box geometry bases and cylindrical column. The column returned is contained in an Object3D, and each element is stacked on top of the previous so that the base of the column sits on the y = 0 plane and grows in the positive y direction. These columns are the columns that circle around the base of the temple at the end of the path in the book-scape, and are meant to mimic a classic, Grecian column (not from the original title page). */
function makeColumn2(baseWidth, baseHeight, whSegs, textStone, rad) {
    var col = new THREE.Object3D(); 
        
    /* Creates the base geometry and mesh using a BoxGeometry and positions the base so that its rests 5 units above the y = 0 plane, its front is at the z = 0 plane. The 2 units are accounted for in the for-loop below, and the base is added to the column container 'col'. */
    var baseGeom= new THREE.BoxGeometry(baseWidth, baseHeight/2, baseWidth);
    var baseMesh = new THREE.Mesh(baseGeom, new THREE.MeshFaceMaterial([textStone, textStone, textStone, textStone, textStone, textStone]));
    baseMesh.position.y = (baseHeight/2)+2; 
    col.add(baseMesh);
    
    /* Creates the two geometry/mesh objects using a BoxGeometry That are positioned directly above and below the base. These extend 2 units past each edge of the base in the x and z directions and are 2 units tall. These features are added to the column container 'col'. */
    for (i=0; i<=1; i++) {
        var colGeom= new THREE.BoxGeometry(baseWidth+2, 2, baseWidth+2);
        // [wall, wall, roof, floor, wall, wall];
        var colTextures = [textStone, textStone, textStone, textStone, textStone, textStone];
        var colMesh = new THREE.Mesh(colGeom, new THREE.MeshFaceMaterial(colTextures));
        colMesh.position.y = (baseHeight/4)+(i*((baseHeight/2)+2));
        col.add(colMesh);
    }
    
    // Sets up a height counter for the column that will be used to place each subsequent element. 
    var currHeight = (baseHeight/4)+(baseHeight/2)+4;
    
    /* Generates a cylindrical column with diameter half of the base width via a CylinderGeometry and mesh object created with the stone texture. The column is positioned using the current height counter, and is added to the column container. The height counter is then updated to reflect the height of the cylinder. */
    var colGeom = new THREE.CylinderGeometry(baseWidth*(1/4), baseWidth*(1/4), baseHeight*2, whSegs, whSegs);
    var colMesh = new THREE.Mesh(colGeom, textStone);  
    colMesh.position.y = currHeight + baseHeight;
    col.add(colMesh);
    
    var colContrib = baseHeight*2; 
    currHeight = currHeight + colContrib; 
    
    /* Generates a BoxGeometry/Mesh with the same dimension as the lower base and with the same rock texture as the rest of the complete column. Positions the top "hat" of the column at the top of the cylinder using the current height measurement, adds the hat to the column container, then moves the complete column backwards (in the negative z direction) the current radius of the cylindrical base that the column will rest on in the scene. */ 
    var hatGeom= new THREE.BoxGeometry(baseWidth, baseHeight/2, baseWidth);
    var hatMesh = new THREE.Mesh(hatGeom, new THREE.MeshFaceMaterial([textStone, textStone, textStone, textStone, textStone, textStone]));
    
    hatMesh.position.y = currHeight+(baseHeight/4);
    col.add(hatMesh);
    
    col.position.z = -rad;
        
    return col;
}

/* The makeBook() method returns a single book object, created using several geometry/meshes formed using the measurments provided: a width, height, and depth for the pages in the book; a texture for the pages; a texture for the book cover; and a width/height segments count for the spine of the book. The book is returned in an Object3D container. */ 
function makeBook(width, height, depth, textPage, textCover, whSegs) {
    var book = new THREE.Object3D();

    // Creates the center stack of pages for the book with the base measurments and the page texture:
    var paperGeom= new THREE.BoxGeometry(width, height, depth);
    // [wall, wall, roof, floor, wall, wall];
    var paperTextures = [textPage,textPage,textCover,textCover,textPage,textPage];
    var paperMesh = new THREE.Mesh(paperGeom, new THREE.MeshFaceMaterial(paperTextures));
    book.add(paperMesh); 
    
    /* Creates the two geometry/mesh objects, page covers, using BoxGeometries that are positioned directly above and below the page stack. These extend 1 unit past each edge of the base in the x and z directions and are 1 units tall. These features are added to the book container 'book'. */
    for (sign=-1; sign<=1; sign=sign+2) {
        var coverGeom= new THREE.BoxGeometry(width+2, depth+2, 2);
        // [wall, wall, roof, floor, wall, wall];
        var coverTextures = [textCover,textCover,textCover,textCover,textCover,textCover];
        var coverMesh = new THREE.Mesh(coverGeom, new THREE.MeshFaceMaterial(coverTextures));
        
        /* The covers are rotated about the x-axis so that their largest faces on y planes, then positioned so that the covers are shifted up or down by half the height of the book plus the height of the cover itself using the sign counter in the for loop to determine which direction each cover is shifted. Finally, the covers are shifted in the positive x direction by 1 unit to make space for the book's spine (added below). The covers are then added to the book container. */
        coverMesh.rotation.x = Math.PI/2; 
        coverMesh.position.y = (sign*((height/2)+1)); 
        coverMesh.position.x = 1; 
        book.add(coverMesh);
    }
    
    /* Creates the book's spine via a a CylinderGeometry rotated from Math.PI to 2*Math.PI, creating half of a cylinder that, which placed against the book, models the curve of the spine. The radius of the spine is calculated first by adding 2 units, for the heights of the covers, to the height of the pages. The depth of the spine is also 2 units greater than the depth of the books to account for the additonal depth, 1 unit in each direction, supplied by the covers. The spine is rotated about the x axis so that it is oriented correctly to match the book, then shifted in the negative x direction so it lies against the face formed by the page and cover geometries.The spine is then added to the book container. */
    var rad = ((height/2)+2); 
    var spineGeom = new THREE.CylinderGeometry(rad, rad, depth+2, whSegs, whSegs, false, Math.PI, Math.PI);
    var spineMesh = new THREE.Mesh(spineGeom, textCover);
    spineMesh.rotation.x = Math.PI/2;
    spineMesh.position.x = -(width/2);
    book.add(spineMesh);
    
    /* The book is returned rotated about the y axis so that the pages are facing the positive z direction and the spine the negative z direction. The base of the book rests on the y = 0 plane, and the center of the object is on the intersection of the x = 0 and y = 0 planes. */
    book.position.set(0,(width+2/2),-(depth+2/2));
    book.rotation.y = -(Math.PI/2);
    
    return book;
}

/* Create a stack of books by calling the makeBook() method (defined above) a given 'numBooks' times by iterating through a for-loop and scaling the books by a set scale factor of (1/8) each time. The book stack grows upwards, and each successive book made has smaller depth and width parameters than the book preceeding it. All books generated have the same height. The books have their y position updated in each iteration of the for loop so that the top and bottom covers of neighboring books rest against each other on the same y plane. The origin of the book stack is on plane y = 0, with the the center of the books at the intersection of the x = 0 and z = 0 planes. The stack is returned as an Object3D. */
function makeStack(numBooks, width, height, depth, textPage, textCover, whSegs){
    var stack = new THREE.Object3D(); 
    var scale = (1/8);
    
    // Uses the scale factor to decrease the width and depth of the books by 1/8 in each iteration.
    for (count = 1; count <= numBooks; count++){
        var factor = scale*count; 
        var update = new makeBook(width-(factor*width), height, depth-(factor*depth), textPage, textCover, whSegs); 
        /* The (count-1)*(height) term in the y position update accounts for the height of the page BoxGeometry of the book, and the (count*4) term accounts for the two book covers of height 2 that bookend the central pages. */
        update.position.y = ((count-1)*(height)+(count*4)); 
        stack.add(update); 
    }
    return stack; 
}   

/* Creates a texture mapped sphere of a given radius (with a given count of width/height segments) that will represent a planet in the book-scape. The origin of the planet remains at the center of the sphere. */
function makeCelestialBody(radius, whSegs, text) {
    var planet = new THREE.Object3D(); 
    var sphereGeom = new THREE.SphereGeometry(radius, whSegs, whSegs);
    var sphereMesh = new THREE.Mesh(sphereGeom, text); 
        
    planet.add(sphereMesh);
    
    return planet
}

/* Citation: This is Dirksen's function from Chp. 7 Demo 07-snowy-scene.html that is used in our program to create the star system. The function is modified from Dirksen's as several features used in the original were deprecated: THREE.ParticleBasicMaterial --> THREE.Points Material, THREE.ParticleSystem --> THREE.PointSystem. It returns a PointSystem to be added to the tree 3D object. Source: http://cs.wellesley.edu/~cs307/threejs/dirksen/chapter-07/07-snowy-scene.html.

The createSystem() function uses spherical coordinates to create several spherical "shells" of different radii. Points are distributed randomly on the shells using the Math.random() method (to calculate the theta and phi coordinates). From above the book-scape hemisphere, it is fairly easy to see that the particles are distributed on spherical shells. From in the scene, though, the perspective camera makes the particle distribution appear random. The theta and phi coordinates are also limited so that the sphere shells only span one quarter of the hemisphere. */
function createSystem(name, sparkleText, size, rad, num, color) {
    var geom = new THREE.Geometry();
    geom.scale(500, 500, 500);
    geom.center();

    var color = new THREE.Color(color);
    color.setHSL(color.getHSL().h,
            color.getHSL().s,
            (Math.random()) * color.getHSL().l);

    for (shell = 1; shell <= num; shell++) {
        
    var range = shell * (rad/num);
    var numStars = shell * (rad/num); 
        for (var i = 0; i < numStars; i++) {

            var theta = Math.random() * Math.PI; 
            var rho = range;
            var phi = Math.random() * Math.PI/2;

            var xCoord = rho*Math.cos(theta)*Math.sin(phi); 
            var yCoord = rho*Math.sin(theta)*Math.sin(phi); 
            var zCoord = rho*Math.cos(phi); 

            var particle = new THREE.Vector3(xCoord,yCoord,zCoord);

            particle.velocityY = 0.1 + Math.random() / 5;
            particle.velocityX = (Math.random() - 0.5) / 3;
            particle.velocityZ = (Math.random() - 0.5) / 3;
            geom.vertices.push(particle);
        }
    }

    var system = new THREE.Points(geom, sparkleText);
    system.name = name;
    system.sortParticles = true;
    return system;
}

// OWL ANIMATION:

/* The makeOwl() method constructs an owl object using several geometries, nested frames, and helper functions defined below. The method takes several textures - two feather textures for the wings and body, a beak color material, and an eye color material, as well as several measuremtns used to measure the size of the owl relative to the scene. The owl is contained in an Object3D container called 'owl', although the animation affects both this container and the 'wingContL' and 'wingContR' containers that hold the left and right owl wings. Thre are 9 wings defined for each side of the owl, created using 9 helper methods below, that are used in the different phases of the owl animation. As the animation occurs, the wing that is visible shifts so the wings appear to go and spread while their containers rotate, too. The wings are all formed from two Bezier surfaces. */ 
function makeOwl(featherBodyText, featherWingText, beakColor, eyeColor, whSegs, owlScale, owlBase, owlStartHeight, owlStartDepth){
    var owl = new THREE.Object3D();
    
    /* The owl's body is created my meshing a SphereGeometry scaled in the y direction with the feather body texture provided as a method argument. The body is then rotated about the y-axis so that the "front" of the body texture is the "front" of the owl (the side of the sphere that is initially visible to the user). */
    var bodyGeom = new THREE.SphereGeometry(owlBase, whSegs, whSegs); 
    var bodyMesh = new THREE.Mesh(bodyGeom, featherBodyText); 
    bodyMesh.rotation.y = -Math.PI/2;
    bodyMesh.scale.y = owlScale; 
    owl.add(bodyMesh); 
    
    //* The owl's head is made using the makeOwlHead() method defined below. The head is positioned on top of the body by first shifting it up so that the two spheres would stack on each other as a snowman would be stacked, then by subtracting 10 units from that position on the y axis so that the head rests more naturally on the owl's body. */
    var head = makeOwlHead(featherBodyText, beakColor, eyeColor, whSegs, owlScale, owlBase);
    head.position.y = (1.75*owlBase) - 10; 
    owl.add(head); 
    
    /* Creates two legs for the owl using the makeOwlLeg() helper method along with the feather and beak materials and several base owl measurements. These legs are added to each side of the owl's body by shifting it's x and y positions over (using the legC counter to determine which direction) and down (in the negative y direction). The legs are added to the owl container. */
    for (legC = -1; legC <= 1; legC = legC + 2) {
        var leg = makeOwlLeg(featherWingText, beakColor, whSegs, owlScale, owlBase);
        leg.position.y = -owlBase; 
        leg.position.x = legC * (owlBase/2);
        owl.add(leg);
    }
    
    /* The 'wingContR' Object3D container holds all 9 right wings that the owl can possibly have. The wing's all occupy the same space, although only one wing will be visible at any given time. The owl animation rotates this container in the positive y direction as the owl rises upwards. The right wings are each defined below - they are created calling the nine helper method used to create each type of wing. The wing's are scaled, and the visiblity is adjusted so that, initially, only wing1R is visible. */
    var wingContR = new THREE.Object3D(); 
    
    // Right Wings: 
    var wing1R = makeOwlWing1(featherWingText, whSegs); 
    wing1R.scale.y = owlBase/3; 
    wing1R.scale.x = owlBase/3;
    
    wingContR.add(wing1R); 
    wing1R.visible = true;
    
    var wing2R = makeOwlWing2(featherWingText, whSegs); 
    wing2R.scale.y = owlBase/3; 
    wing2R.scale.x = owlBase/3;
    
    wingContR.add(wing2R); 
    wing2R.visible = false;
    
    var wing3R = makeOwlWing3(featherWingText, whSegs); 
    wing3R.scale.y = owlBase/3; 
    wing3R.scale.x = owlBase/3;
    
    wingContR.add(wing3R); 
    wing3R.visible = false;
    
    var wing4R = makeOwlWing4(featherWingText, whSegs); 
    wing4R.scale.y = owlBase/3; 
    wing4R.scale.x = owlBase/3;
    
    wingContR.add(wing4R); 
    wing4R.visible = false;
    
    var wing5R = makeOwlWing5(featherWingText, whSegs); 
    wing5R.scale.y = owlBase/3; 
    wing5R.scale.x = owlBase/3;
    
    wingContR.add(wing5R); 
    wing5R.visible = false;
    
    var wing6R = makeOwlWing6(featherWingText, whSegs); 
    wing6R.scale.y = owlBase/3; 
    wing6R.scale.x = owlBase/3;
    
    wingContR.add(wing6R); 
    wing6R.visible = false;
    
    var wing7R = makeOwlWing7(featherWingText, whSegs); 
    wing7R.scale.y = owlBase/3; 
    wing7R.scale.x = owlBase/3;
    
    wingContR.add(wing7R); 
    wing7R.visible = false;
    
    var wing8R = makeOwlWing8(featherWingText, whSegs); 
    wing8R.scale.y = owlBase/3; 
    wing8R.scale.x = owlBase/3;
    
    wingContR.add(wing8R); 
    wing8R.visible = false;
    
    var wing9R = makeOwlWing9(featherWingText, whSegs); 
    wing9R.scale.y = owlBase/3; 
    wing9R.scale.x = owlBase/3;
    
    wingContR.add(wing9R); 
    wing9R.visible = false;
    
    /* The wings are added to an arraythat will be used to access then in the animation, then the right wing container's y and y positions are set so that the right wing tip rests against the upper part of the scaled body sphere. Finally, the initial z rotation of the wing is set and the wing container is added to the owl container. */
    var rightWings = [wing1R, wing2R, wing3R, wing4R, wing5R, wing6R, wing7R, wing8R, wing9R];
    
    wingContR.position.x = 2*owlBase/3;
    wingContR.position.y = 2*owlBase/3;
    
    wingContR.rotation.z = -5*Math.PI/16;
    owl.add(wingContR); 
    
    /* The 'wingContL' Object3D container holds all 9 left wings that the owl can possibly have. The wing's all occupy the same space, although only one wing will be visible at any given time. The owl animation rotates this container in the positive y direction as the owl rises upwards. The left wings are each defined below - they are created calling the nine helper method used to create each type of wing. The wing's are scaled, and the visiblity is adjusted so that, initially, only wing1L is visible. The left wings are rotated Math.PI radians away from the right wings so that the two rest opposite each other on the owl's body. */
    var wingContL = new THREE.Object3D(); 
    
    // Left Wings: 
    var wing1 = makeOwlWing1(featherWingText, whSegs); 
    wing1.scale.y = owlBase/3; 
    wing1.scale.x = owlBase/3;
    wing1.rotation.y = Math.PI;
    
    wingContL.add(wing1); 
    wing1.visible = true;
    
    var wing2 = makeOwlWing2(featherWingText, whSegs); 
    wing2.scale.y = owlBase/3; 
    wing2.scale.x = owlBase/3;
    wing2.rotation.y = Math.PI;
    
    wingContL.add(wing2); 
    wing2.visible = false;
    
    var wing3 = makeOwlWing3(featherWingText, whSegs); 
    wing3.scale.y = owlBase/3; 
    wing3.scale.x = owlBase/3;
    wing3.rotation.y = Math.PI;
    
    wingContL.add(wing3); 
    wing3.visible = false;
    
    var wing4 = makeOwlWing4(featherWingText, whSegs); 
    wing4.scale.y = owlBase/3; 
    wing4.scale.x = owlBase/3;
    wing4.rotation.y = Math.PI;
    
    wingContL.add(wing4); 
    wing4.visible = false;
    
    var wing5 = makeOwlWing5(featherWingText, whSegs); 
    wing5.scale.y = owlBase/3; 
    wing5.scale.x = owlBase/3;
    wing5.rotation.y = Math.PI;
    
    wingContL.add(wing5);
    wing5.visible = false;
    
    var wing6 = makeOwlWing6(featherWingText, whSegs); 
    wing6.scale.y = owlBase/3; 
    wing6.scale.x = owlBase/3;
    wing6.rotation.y = Math.PI;
    
    wingContL.add(wing6); 
    wing6.visible = false;
    
    var wing7 = makeOwlWing7(featherWingText, whSegs); 
    wing7.scale.y = owlBase/3; 
    wing7.scale.x = owlBase/3;
    wing7.rotation.y = Math.PI;
    
    wingContL.add(wing7); 
    wing7.visible = false;
    
    var wing8 = makeOwlWing8(featherWingText, whSegs); 
    wing8.scale.y = owlBase/3; 
    wing8.scale.x = owlBase/3;
    wing8.rotation.y = Math.PI;
    
    wingContL.add(wing8); 
    wing8.visible = false;
    
    var wing9 = makeOwlWing9(featherWingText, whSegs); 
    wing9.scale.y = owlBase/3; 
    wing9.scale.x = owlBase/3;
    wing9.rotation.y = Math.PI;
    
    wingContL.add(wing9); 
    wing9.visible = false;
    
    /* The wings are added to an arraythat will be used to access then in the animation, then the right wing container's y and y positions are set so that the right wing tip rests against the upper part of the scaled body sphere. Finally, the initial z rotation of the wing is set and the wing container is added to the owl container. */
    var leftWings = [wing1, wing2, wing3, wing4, wing5, wing6, wing7, wing8, wing9];
    
    wingContL.position.x = -2*owlBase/3;
    wingContL.position.y = 2*owlBase/3;
    wingContL.rotation.z = 5*Math.PI/16;
    owl.add(wingContL); 
    
    /* The ow's initial positions with reference to the y and z axes are recorded so that the owl can be animated to move in these directions. */
    owl.position.y = owlStartHeight;
    owl.position.z = owlStartDepth;
    
    /* Citation: Copied from in class Mass-Spring System Example - cs.wellesley.edu/~cs307/threejs/demos/Animation/mass-spring.html. */
    
    // State variables of the animation
    /* Sets up the owl's animation state with seven measures that are used to update either the owl's position in y/z space or the rotation of its wings about the z axis via the updateOwlState() method. The initial z and y positions are set, and a delta value is provided for these animated shifts. For the wing animation, a counter is used to track how many of the 9 wing options the animation has used. Also provided are the initial wing rotations about the z axis and the delta value for these rotations. */
    var owlState = {
            zPos: owlStartDepth,
            yPos: owlStartHeight,
            deltaPos: 20,
            wingCount: 0,
            wingLeftAngleZ: 5*Math.PI/16,
            wingRightAngleZ: -5*Math.PI/16,
            deltaWing: Math.PI/16
        }; 
    
    // Variables to hold the currently visible left and right wings: 
    var currWingL; 
    var currWingR;
    
    /* Variables used to dictate if and when the owl executes its two behaviors: owlRise and owlLower are used to indicate to the updateOwlSteat method that a motion pattern should begin via if statements, while owlIsUp and owlIsDown are used to verify that the owl actually should execute the motion - ex: if the owl is already up, then the 'r' key should not trigger another motion if pressed by the user. */ 
    var owlRise = false; 
    var owlLower = false; 
    var owlIsUp = false; 
    var owlIsDown = true; 
    
    /* goUp() resets owlRise and owlLower so that, when updateOwlState() is called, the owl will rise so long as the owl is not already up (checked via owlIsUp) in the if statement. */
    owl.goUp = function() { 
        if (owlIsUp == false) {
            owlRise = true; 
            owlIsDown = false; 
        }
    }
    
    /* goDown() resets owlRise and owlLower so that, when updateOwlState() is called, the owl will rise so long as the owl is not already up (checked via owlIsDown) in the if statement. */
    owl.goDown = function() { 
        if (owlIsDown == false) {
        owlLower = true; 
        owlIsUp = false; 
        }
    }
    
    /* The updateOwlState() method is responsible for controlling all of the owl animations - that is, how, if, and when the owl should move. The function takes a number, the current index of the wing that should be made visible in the arrays of left and right wings. Described before each possible execution (if statement) are the details of how and when the owl will move. */ 
    owl.updateOwlState = function(num){
        
        /* If the owl isn't already elevated and the owl.goUp() method has been invoked, making owlRise == true, the counter being passed into updateOwlState (deltaOwl in the animation state defined in createBookSpace() is divisible by 3, and the total count has not exceeded 24 - 8 animation states from the 8 wings that change every three seconds), then the owl will move upwards and forwards (+y and +z) while its wing's rotate in the positive y direction. Every three counts, the owl will shift, rotate, and replace one of it's wings with the next in the arrays of wings, as indicated by the shifting owl parameter wingCount. */
        if (owlIsUp == false && owlRise == true && num % 3 == 0 && num < 24) {
            // console.log(num);
            // console.log(owlRise);
            
            // Makes the current left and right wings invisible. 
            currWingL = leftWings[owlState.wingCount];
            currWingL.visible = false; 
            currWingR = rightWings[owlState.wingCount];
            currWingR.visible = false; 

            // Updates the wing count, incrementing forwards from the initial wing: 
            owlState.wingCount ++; 

            // Makes the new current left and right wings visible. 
            currWingL = leftWings[owlState.wingCount]; 
            currWingL.visible = true; 
            currWingR = rightWings[owlState.wingCount]; 
            currWingR.visible = true; 

            /* Uses the owl parameters to calculate the updated z rotations, z position, and y position, then makes the changes. */
            owlState.wingLeftAngleZ -= owlState.deltaWing; 
            owlState.wingRightAngleZ -= (-owlState.deltaWing); 
            owlState.yPos += owlState.deltaPos;
            owlState.zPos += owlState.deltaPos;

            var deltaLWing = owlState.wingLeftAngleZ;
            var deltaRWing = owlState.wingRightAngleZ;
            var deltaOwlY = owlState.yPos;
            var deltaOwlZ = owlState.zPos; 

            wingContL.rotation.z = deltaLWing;
            wingContR.rotation.z = deltaRWing; 
            owl.position.y = deltaOwlY;
            owl.position.z = deltaOwlZ;
            console.log(deltaOwlZ);
        }
        
        /* When the above if statement stops executing, this if statement will execute, halting the owl's motion as there are no more possible wings that it can iterate through in the array. The owlRise, owlIsUp, and owlIsDown booleans are all updated to reflect the owl's new state. */
        if (owlIsUp == false && owlRise == true && num >= 24) {
            owlRise = false; 
            owlIsUp = true;
            owlIsDown = false; 
            
            // console.log(owlRise); 
            // console.log(owlState.wingCount); 
        }
    
        /* If the owl isn't already lowered and the owl.goDown() method has been invoked, making owlLower == true, the counter being passed into updateOwlState (deltaOwl in the animation state defined in createBookSpace() is divisible by 3, and the total count has not exceeded 24 - 8 animation states from the 8 wings that change every three seconds), then the owl will move downwards and backwards (-y and -z) while its wing's rotate in the negative y direction. Every three counts, the owl will shift, rotate, and replace one of it's wings with the next in the arrays of wings, as indicated by the shifting owl parameter wingCount. */
        if (owlIsDown == false && owlLower == true && num % 3 == 0 && num < 24) {
            // console.log(num);
            // console.log(owlLower);
            
            // Makes the current left and right wings invisible. 
            currWingL = leftWings[owlState.wingCount];
            currWingL.visible = false; 
            currWingR = rightWings[owlState.wingCount];
            currWingR.visible = false; 

            // Updates the wing count, incrementing backwards from the final wing: 
            owlState.wingCount --; 

            // Makes the new current left and right wings visible. 
            currWingL = leftWings[owlState.wingCount]; 
            currWingL.visible = true; 
            currWingR = rightWings[owlState.wingCount]; 
            currWingR.visible = true; 

            /* Uses the owl parameters to calculate the updated z rotations, z position, and y position, then makes the changes. */
            owlState.wingLeftAngleZ += owlState.deltaWing; 
            owlState.wingRightAngleZ += (-owlState.deltaWing); 
            owlState.yPos -= owlState.deltaPos;
            owlState.zPos -= owlState.deltaPos;
                
            var deltaLWing = owlState.wingLeftAngleZ;
            var deltaRWing = owlState.wingRightAngleZ;
            var deltaOwlY = owlState.yPos;
            var deltaOwlZ = owlState.zPos; 
            
                
            wingContL.rotation.z = deltaLWing;
            wingContR.rotation.z = deltaRWing; 
            owl.position.y = deltaOwlY;
            owl.position.z = deltaOwlZ; 
        }
        
        /* When the above if statement stops executing, this if statement will execute, halting the owl's motion as there are no more possible wings that it can iterate through in the array. The owlLower, owlIsDown, and owlIsUp booleans are all updated to reflect the owl's new state. */
        if (owlIsDown == false && owlLower == true && num >= 24) {
            owlLower = false; 
            owlIsDown = true;
            owlIsUp = false; 
            
            // console.log(owlLower); 
            // console.log(owlState.wingCount); 
        }
    }
    return owl; 
}

/* The makeOwlHead() method creates the owl's head, returning an Object3D container that holds all distinct parts of the head - the head itself, the eyes, the pupils, the horns, and the beak. The method takes materials/textures for the owl's feathers, beak, and eyes. The Object3D returned will be pieced onto the owl when the method is invoked in makeOwl(), defined above. */
function makeOwlHead(featherText, beakColor, eyeColor, whSegs, owlScale, owlBase){
    var head = new THREE.Object3D(); 
    
    /*The owl's head is created my meshing a SphereGeometry scaled down in the y direction with the feather body texture provided as a method argument. The head is then rotated about the y-axis so that the "front" of the head texture is the opposite of the body (as the same texture is used for both spherical components of the owl. The head is then added to the head container. */
    var headGeom = new THREE.SphereGeometry(owlBase, whSegs, whSegs); 
    var headMesh = new THREE.Mesh(headGeom, featherText); 
    headMesh.scale.y = owlScale/2;  
    headMesh.rotation.y = Math.PI/2;
    head.add(headMesh); 
    
    /* Creates two (eyes = irises + pupils) for the owl using four SphereGeometry objects meshed with the beak material and the eye material, respectively. The iris and pupil components are added to each side of the owl's head after they are scaled (irises in the x direction and pupils in the y direction) by rotating them in the z direction, using the eyeC for loop counter to dictate direction of movement, before they are shifted in the positive z direction so that they are realistically placed on the curve of the head. The pupils are also rotated in the x direction. One iris and one pupil are placed in each eye container created by the for loop, and the eye containers are added to the head container. */
    for (eyeC = -1; eyeC <= 1; eyeC = eyeC + 2) {
        var eye = new THREE.Object3D(); 
        
        var eyeGeom = new THREE.SphereGeometry(owlBase/7.5, whSegs, whSegs); 
        var eyeMesh = new THREE.Mesh(eyeGeom, beakColor); 
        eyeMesh.scale.x = owlScale; 
        eyeMesh.rotation.z = eyeC * Math.PI/8;
        eyeMesh.position.z = owlBase*(18/20); 
        eye.add(eyeMesh); 
                
        var pupilGeom = new THREE.SphereGeometry(owlBase/15, whSegs, whSegs); 
        var pupilMesh = new THREE.Mesh(pupilGeom, eyeColor); 
        pupilMesh.scale.y = owlScale*owlScale;
        pupilMesh.position.z = owlBase; 
        pupilMesh.rotation.x = -Math.PI/8;
        pupilMesh.rotation.z = -eyeC * Math.PI/8;
        
        eye.add(pupilMesh);

        eye.rotation.y = Math.PI/8 * eyeC; 
        eye.rotation.x = -Math.PI/20;
        eye.rotation.z = eyeC * Math.PI/8;
        head.add(eye); 
    }
    
    /* Creates a beak for the owl from two half cylindrical cones, meshing the geometries with the beak material. These half cones are then rotated and positioned so that then "open" slightly away from each other, as if the owl were making a noise. The two beak halve are then added to an Object3D called 'beak', which is rotated about the x axis downwards on the owl's head before being added to the head container. The cylinders do not have a bottom face. */
    for (beakC = -1; beakC <= 1; beakC = beakC + 2) {
        var beak = new THREE.Object3D(); 

        var beakGeom = new THREE.CylinderGeometry(0, owlBase/3, owlBase, whSegs, whSegs, true, Math.PI, Math.PI*beakC); 
        var beakMesh = new THREE.Mesh(beakGeom, beakColor); 
        beakMesh.rotation.set(Math.PI/2, Math.PI/2, Math.PI/64*beakC);
        beakMesh.position.z = owlBase; 
        beakMesh.position.y = (owlBase/64)*(-beakC); 
        beak.add(beakMesh); 
        
        beak.rotation.x = Math.PI/20; 
        head.add(beak);
    }
    
    /* Creates two horns for the owl from cylindrical cones, meshing the geometries with feather texture provided. These cones are positioned up in the positive y direction and in either the positive or negative x direction, dictated by the hornC for loop counter, so that they rest on top of either side of the owl's head. The horns are each added to an Object3D container 'horn' that is rotated about the z axis by a number of degrees multipled, again, by hornC so that the horns tilt outwards from the owl's head. */
    for (hornC = -1; hornC <= 1; hornC = hornC + 2) {
        var horn = new THREE.Object3D(); 

        var hornGeom = new THREE.CylinderGeometry(0, owlBase/2, owlBase*(2/3), whSegs, whSegs, false, Math.PI, Math.PI*beakC); 
        var hornMesh = new THREE.Mesh(hornGeom, featherText); 
        hornMesh.position.y = 9*owlBase/10;
        hornMesh.position.x = -hornC * owlBase/3;
        
        horn.add(hornMesh); 
        horn.rotation.z = hornC * Math.PI/6;
        head.add(horn);
    }
    
    return head; 
}

/* The makeOwlLeg() method is called in the makeOwl() method defined above to create legs on either side of the owl's body. The legs are made up of a spherical base, a cylindrical leg, and three TorusGeometry toes that curl slightly dowards from the base of the leg. The method takes a feather texture and the beak material, as well as several guiding measurments for the owl. A leg is returned as an Object3D called leg. */
function makeOwlLeg(featherText, beakColor, whSegs, owlScale, owlBase){
    var leg = new THREE.Object3D(); 
    
    /*The owl's leg base is created my meshing a SphereGeometry scaled down in the y direction with the feather body texture provided as a method argument. The leg is then rotated about the y-axis so that the "front" of the leg texture is the "front" of the owl (the side of the sphere that is initially visible to the user). The leg base is then added to the leg container. */
    var baseGeom = new THREE.SphereGeometry(owlBase/2, whSegs, whSegs); 
    var baseMesh = new THREE.Mesh(baseGeom, featherText); 
    baseMesh.rotation.y = -Math.PI/2;
    baseMesh.scale.y = owlScale; 
    
    leg.add(baseMesh); 
    
    /* The leg length portion of the leg is a CylinderGeometry that decreases in radius from top to bottom by a factor of two. The geometry is meshed with the leg material, and the leg length is positioned in the negative y direction so that it's top meets the bottom of the leg base. The leg length is then added to the leg container. */
    var legLGeom = new THREE.CylinderGeometry(owlBase/5, owlBase/10, owlBase/2, whSegs, whSegs); 
    var legLMesh = new THREE.Mesh(legLGeom, beakColor); 
    legLMesh.position.y = -3*owlBase/4;
    leg.add(legLMesh); 
    
    /* Creates three toes for the owl from TorusGeometries meshed with the beak material. The TorusGeometries are each one quarter (Math.PI/2 radians) of a full tubular circle/torus. These tubes are positioned and rotated about the x, y, and z axes using the toeC for loop  counter so that one toe points along the negative z axis while the other two are rotated about the y axis so that they are Math.PI/8 radians apart on the front of the leg. The first rotations and positionings ensure that each toe originated from the base of the leg and curve out and slightly down. The toes are added to Object3D containers, which are then added to the leg container. */
    for (toeC = -1; toeC <= 1; toeC++) {
        var toe = new THREE.Object3D(); 
        
        var toeGeom = new THREE.TorusGeometry(owlBase/4, owlBase/16, whSegs, whSegs, Math.PI/2); 
        var toeMesh = new THREE.Mesh(toeGeom, beakColor); 
        toeMesh.position.y = -5*owlBase/4;
        toeMesh.position.z = -3*owlBase/16;
        toeMesh.rotation.x = -Math.PI/8;
        toeMesh.rotation.y = Math.PI/2;
        toeMesh.rotation.z = Math.PI/3
        toe.add(toeMesh); 
        
        toe.rotation.y = Math.PI; // Initialize rotations: 
        toe.rotation.y = toeC * 7*Math.PI/8;
        leg.add(toe); 
    }
    
    return leg;
}

/* All 9 methods below make an owl wing in the same way, following the template provided in the in class surface modeling exercise: http://cs.wellesley.edu/~cs307/threejs/demos/CurvesAndSurfaces/dome-surface1.html. Each method uses two arrays of 16 control points that define Bezier surfaces, one concave and the other convex, that mirror each other. The two surfaces together model a 3D owl wing. The wings slowly shift from an initial position to a final position so that the animation will look smooth. The arrays of points are used with the THREE.BezierSurfaceGeometry constructor and the .reverse() method provided by the professor to generate two surfaces geometries, which are them meshed with a feather texture to and added to a wing container, then returned. */
function makeOwlWing1(featherText, whSegs, owlBase) {
    var wing = new THREE.Object3D(); 
    
    // Initial Wing Control Points:   
    var wingTop = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,2],  [4,-1,1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,2],  [6,-2,1],  [7, -2, 0] ],
        [ [6,-5,0],  [8,-6,0], [9,-4,0], [9, 0, 0] ],
    ];
    
    var wingBottom = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,-2],  [4,-1,-1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,-2],  [6,-2,-1],  [7, -2, 0] ],
        [ [6,-5,0],  [8,-6,0], [9,-4,0], [9, 0, 0] ],
    ];

    var surfGeomU = new THREE.BezierSurfaceGeometry( wingTop.reverse(), whSegs, whSegs );
    var surfGeomL = new THREE.BezierSurfaceGeometry( wingBottom.reverse(), whSegs, whSegs );
    var surfU = new THREE.Mesh( surfGeomU, featherText );
    var surfL = new THREE.Mesh( surfGeomL, featherText );
    wing.add(surfU);
    wing.add(surfL);
    
    return wing; 
}

function makeOwlWing2(featherText, whSegs, owlBase) {
    var wing = new THREE.Object3D(); 
    
    // Wing Control Points:
    var wingTop = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,2],  [4,-1,1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,2],  [6,-2,1],  [7, -2, 0] ],
        [ [6,-5,0],  [8,-6,0], [10,-4,0], [10, 1, 0] ],
    ];
    
    var wingBottom = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,-2],  [4,-1,-1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,-2],  [6,-2,-1],  [7, -2, 0] ],
        [ [6,-5,0],  [8,-6,0], [10,-4,0], [10, 1, 0] ],
    ];

    var surfGeomU = new THREE.BezierSurfaceGeometry( wingTop.reverse(), whSegs, whSegs );
    var surfGeomL = new THREE.BezierSurfaceGeometry( wingBottom.reverse(), whSegs, whSegs );
    var surfU = new THREE.Mesh( surfGeomU, featherText );
    var surfL = new THREE.Mesh( surfGeomL, featherText );
    wing.add(surfU);
    wing.add(surfL);
    
    return wing; 
}

function makeOwlWing3(featherText, whSegs, owlBase) {
    var wing = new THREE.Object3D(); 
    
    // Wing Control Points:
    var wingTop = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,2],  [4,-1,1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,2],  [6,-2,1],  [7, -2, 0] ],
        [ [6,-5,0],  [8,-6,0], [11,-3,0], [11, 2, 0] ],
    ];
    
    var wingBottom = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,-2],  [4,-1,-1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,-2],  [6,-2,-1],  [7, -2, 0] ],
        [ [6,-5,0],  [8,-6,0], [11,-3,0], [11, 2, 0] ],
    ];

    var surfGeomU = new THREE.BezierSurfaceGeometry( wingTop.reverse(), whSegs, whSegs );
    var surfGeomL = new THREE.BezierSurfaceGeometry( wingBottom.reverse(), whSegs, whSegs );
    var surfU = new THREE.Mesh( surfGeomU, featherText );
    var surfL = new THREE.Mesh( surfGeomL, featherText );
    wing.add(surfU);
    wing.add(surfL);
    
    return wing; 
}

function makeOwlWing4(featherText, whSegs, owlBase) {
    var wing = new THREE.Object3D(); 
    
    // Wing Control Points:
    var wingTop = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,2],  [4,-1,1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,2],  [6,-2,1],  [8, -2, 0] ],
        [ [6,-5,0],  [8,-6,0], [11,-3,0], [12, 3, 0] ],
    ];
    
    var wingBottom = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,-2],  [4,-1,-1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,-2],  [6,-2,-1],  [8, -2, 0] ],
        [ [6,-5,0],  [8,-6,0], [11,-3,0], [12, 3, 0] ],
    ];

    var surfGeomU = new THREE.BezierSurfaceGeometry( wingTop.reverse(), whSegs, whSegs );
    var surfGeomL = new THREE.BezierSurfaceGeometry( wingBottom.reverse(), whSegs, whSegs );
    var surfU = new THREE.Mesh( surfGeomU, featherText );
    var surfL = new THREE.Mesh( surfGeomL, featherText );
    wing.add(surfU);
    wing.add(surfL);
    
    return wing; 
}

function makeOwlWing5(featherText, whSegs, owlBase) {
    var wing = new THREE.Object3D(); 
    
    // Wing Control Points:
    var wingTop = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,2],  [4,-1,1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,2],  [6,-2,1],  [8, -1, 0] ],
        [ [6,-5,0],  [8,-6,0], [11,-3,0], [13, 4, 0] ],
    ];
    
    var wingBottom = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,-2],  [4,-1,-1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,-2],  [6,-2,-1],  [8, -1, 0] ],
        [ [6,-5,0],  [8,-6,0], [11,-3,0], [13, 4, 0] ],
    ];

    var surfGeomU = new THREE.BezierSurfaceGeometry( wingTop.reverse(), whSegs, whSegs );
    var surfGeomL = new THREE.BezierSurfaceGeometry( wingBottom.reverse(), whSegs, whSegs );
    var surfU = new THREE.Mesh( surfGeomU, featherText );
    var surfL = new THREE.Mesh( surfGeomL, featherText );
    wing.add(surfU);
    wing.add(surfL);
    
    return wing; 
}

function makeOwlWing6(featherText, whSegs, owlBase) {
    var wing = new THREE.Object3D(); 
    
    // Wing Control Points:
    var wingTop = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,2],  [4,-1,1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,2],  [6,-2,1],  [9, -1, 0] ],
        [ [6,-5,0],  [10,-7,0], [13,-3,0], [14, 5, 0] ],
    ];
    
    var wingBottom = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,-2],  [4,-1,-1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,-2],  [6,-2,-1],  [9, -1, 0] ],
        [ [6,-5,0],  [10,-7,0], [13,-3,0], [14, 5, 0] ],
    ];

    var surfGeomU = new THREE.BezierSurfaceGeometry( wingTop.reverse(), whSegs, whSegs );
    var surfGeomL = new THREE.BezierSurfaceGeometry( wingBottom.reverse(), whSegs, whSegs );
    var surfU = new THREE.Mesh( surfGeomU, featherText );
    var surfL = new THREE.Mesh( surfGeomL, featherText );
    wing.add(surfU);
    wing.add(surfL);
    
    return wing; 
}

function makeOwlWing7(featherText, whSegs, owlBase) {
    var wing = new THREE.Object3D(); 
    
    // Wing Control Points:
    var wingTop = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,2],  [4,-1,1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,2],  [6,-2,1],  [9, -1, 0] ],
        [ [6,-5,0],  [10,-7,0], [15,-3,0], [14, 6, 0] ],
    ];
    
    var wingBottom = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,-2],  [4,-1,-1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,-2],  [6,-2,-1],  [9, -1, 0] ],
        [ [6,-5,0],  [10,-7,0], [15,-3,0], [14, 6, 0] ],
    ];

    var surfGeomU = new THREE.BezierSurfaceGeometry( wingTop.reverse(), whSegs, whSegs );
    var surfGeomL = new THREE.BezierSurfaceGeometry( wingBottom.reverse(), whSegs, whSegs );
    var surfU = new THREE.Mesh( surfGeomU, featherText );
    var surfL = new THREE.Mesh( surfGeomL, featherText );
    wing.add(surfU);
    wing.add(surfL);
    
    return wing; 
}

function makeOwlWing8(featherText, whSegs, owlBase) {
    var wing = new THREE.Object3D(); 
    
    // Wing Control Points:
    var wingTop = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,2],  [4,-1,1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,2],  [6,-2,1],  [10, -1, 0] ],
        [ [6,-5,0],  [12,-8,0], [17,-3,0], [16, 7, 0] ],
    ];
    
    var wingBottom = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,-2],  [4,-1,-1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,-2],  [6,-2,-1],  [10, -1, 0] ],
        [ [6,-5,0],  [12,-8,0], [17,-3,0], [16, 7, 0] ],
    ];
    var surfGeomU = new THREE.BezierSurfaceGeometry( wingTop.reverse(), whSegs, whSegs );
    var surfGeomL = new THREE.BezierSurfaceGeometry( wingBottom.reverse(), whSegs, whSegs );
    var surfU = new THREE.Mesh( surfGeomU, featherText );
    var surfL = new THREE.Mesh( surfGeomL, featherText );
    wing.add(surfU);
    wing.add(surfL);
    
    return wing; 
}

function makeOwlWing9(featherText, whSegs, owlBase) {
    var wing = new THREE.Object3D(); 
    
    // Final Wing Control Points:
    var wingTop = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,2],  [4,-1,1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,2],  [6,-2,1],  [10, 0, 0] ],
        [ [6,-5,0],  [12,-8,0], [19,0,0], [17, 8, 0] ],
    ];
    
    var wingBottom = [
        [ [0,0,0],  [3,2,0], [4,2,0], [5, 1, 0] ],
        [ [2,-1,0], [0,0,-2],  [4,-1,-1],  [6, 0, 0] ],
        [ [4,-4,0], [4,-3,-2],  [6,-2,-1],  [10, 0, 0] ],
        [ [6,-5,0],  [12,-8,0], [19,0,0], [17, 8, 0] ],
    ];

    var surfGeomU = new THREE.BezierSurfaceGeometry( wingTop.reverse(), whSegs, whSegs );
    var surfGeomL = new THREE.BezierSurfaceGeometry( wingBottom.reverse(), whSegs, whSegs );
    var surfU = new THREE.Mesh( surfGeomU, featherText );
    var surfL = new THREE.Mesh( surfGeomL, featherText );
    wing.add(surfU);
    wing.add(surfL);
    
    return wing; 
}