System.register(['rodin/core', '../components/vpControls.js'], function (_export, _context) {
    "use strict";

    var RODIN, VPcontrolPanel;
    return {
        setters: [function (_rodinCore) {
            RODIN = _rodinCore;
        }, function (_componentsVpControlsJs) {
            VPcontrolPanel = _componentsVpControlsJs.VPcontrolPanel;
        }],
        execute: function () {
            RODIN.start();
            /**
             * Create a separate scene for video player
             * @type {RODIN.Scene}
             */
            const videoPlayerScene = new RODIN.Scene('videoPlayerScene');

            /**
             * Creates a video player
             * with controls and a video
             */

            _export('videoPlayerScene', videoPlayerScene);

            class VideoPlayer {
                constructor() {
                    this.player = new RODIN.MaterialPlayer({
                        HD: '',
                        SD: '',
                        default: 'HD'
                    });
                }

                /**
                 * Play a video with given parameters
                 * @param url
                 * @param title
                 * @param backgroundImage
                 * @param transition
                 */
                playVideo(url, title, backgroundImage, transition) {
                    if (!this.controls) {
                        this.controls = new VPcontrolPanel({
                            player: this.player,
                            title: title,
                            cover: backgroundImage,
                            distance: 2,
                            width: 3
                        }, transition);
                        this.container();

                        this.player.loadVideo(url);
                    } else {
                        this.controls.loadVideo(title, url, backgroundImage);
                    }
                }

                /**
                 * Initializes environment for the video player
                 */
                container() {
                    let controlPanel, material, sphere;

                    videoPlayerScene.preRender(() => {
                        this.player.update(RODIN.Time.delta);
                    });
                    controlPanel = this.controls;
                    controlPanel.on(RODIN.CONST.READY, evt => {
                        videoPlayerScene.add(evt.target);
                        evt.target.position.y = 1.6;
                        if (evt.target.coverEl) {
                            evt.target.coverEl.rotation.y = -Math.PI / 2;
                        }
                    });
                    material = new THREE.MeshBasicMaterial({
                        map: this.player.getTexture()
                    });
                    sphere = new RODIN.Sculpt(new THREE.Mesh(new THREE.SphereBufferGeometry(90, 720, 4), material));
                    sphere.scale.set(1, 1, -1);
                    sphere.rotation.y = Math.PI / 2;
                    videoPlayerScene.add(sphere);
                }

            }

            _export('VideoPlayer', VideoPlayer);
        }
    };
});