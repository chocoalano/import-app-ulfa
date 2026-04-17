import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from "react";

interface ThreeColor {
    setHex: (hex: number) => void;
}

interface ThreeMaterial {
    color: ThreeColor;
    opacity: number;
    needsUpdate: boolean;
    metalness?: number;
    roughness?: number;
    emissive?: ThreeColor;
    emissiveIntensity?: number;
    clone: () => ThreeMaterial;
}

interface ThreeObject3D {
    add: (object: ThreeObject3D) => void;
    rotation: { x: number; y: number; z: number };
    position: { set: (x: number, y: number, z: number) => void; x: number; y: number; z: number };
    scale: { set: (x: number, y: number, z: number) => void };
    lookAt: (x: number, y: number, z: number) => void;
    material?: ThreeMaterial;
    children: ThreeObject3D[];
}

interface ThreeCamera extends ThreeObject3D {
    aspect: number;
    updateProjectionMatrix: () => void;
}

interface ThreeLight extends ThreeObject3D {
    color: ThreeColor;
    intensity: number;
    castShadow?: boolean;
    shadow?: {
        mapSize: { width: number; height: number };
        camera: { near: number; far: number };
    };
}

interface ThreeMesh extends ThreeObject3D {
    castShadow: boolean;
    receiveShadow: boolean;
    material: ThreeMaterial;
}

interface ThreeRenderer {
    setSize: (width: number, height: number) => void;
    setPixelRatio: (ratio: number) => void;
    setClearColor: (color: number, alpha: number) => void;
    shadowMap: { enabled: boolean; type: number };
    domElement: HTMLCanvasElement;
    render: (scene: ThreeObject3D, camera: ThreeCamera) => void;
    dispose: () => void;
}

interface ThreeControls {
    enableDamping: boolean;
    dampingFactor: number;
    enableZoom: boolean;
    enablePan: boolean;
    minDistance: number;
    maxDistance: number;
    rotateSpeed: number;
    zoomSpeed: number;
    autoRotate: boolean;
    autoRotateSpeed: number;
    update: () => void;
    dispose: () => void;
}

interface ThreeBufferGeometry {
    setAttribute: (name: string, attribute: unknown) => void;
    setFromPoints: (points: unknown[]) => ThreeBufferGeometry;
    clone: () => ThreeBufferGeometry;
    attributes: {
        position: {
            array: Float32Array;
            needsUpdate: boolean;
        };
    };
}

interface ThreePointsMaterial {
    size: number;
    opacity: number;
    needsUpdate: boolean;
}

interface GeoFeature {
    geometry: {
        type: string;
        coordinates: number[][][] | number[][][][];
    };
}

declare global {
    interface Window {
        THREE: {
            Scene: new () => ThreeObject3D;
            PerspectiveCamera: new (fov: number, aspect: number, near: number, far: number) => ThreeCamera;
            WebGLRenderer: new (params: unknown) => ThreeRenderer;
            SphereGeometry: new (radius: number, widthSegments: number, heightSegments: number) => unknown;
            MeshStandardMaterial: new (params: unknown) => ThreeMaterial;
            Mesh: new (geometry: unknown, material: unknown) => ThreeMesh;
            AmbientLight: new (color: number, intensity: number) => ThreeLight;
            DirectionalLight: new (color: number, intensity: number) => ThreeLight;
            PointLight: new (color: number, intensity: number, distance: number) => ThreeLight;
            BufferGeometry: new () => ThreeBufferGeometry;
            BufferAttribute: new (array: Float32Array, itemSize: number) => unknown;
            PointsMaterial: new (params: unknown) => ThreePointsMaterial;
            Points: new (geometry: unknown, material: unknown) => ThreeMesh;
            MeshBasicMaterial: new (params: unknown) => ThreeMaterial;
            Group: new () => ThreeObject3D;
            LineBasicMaterial: new (params: unknown) => ThreeMaterial;
            Line: new (geometry: unknown, material: unknown) => ThreeMesh;
            BackSide: number;
            AdditiveBlending: number;
            PCFSoftShadowMap: number;
            OrbitControls?: new (camera: ThreeCamera, domElement: HTMLElement) => ThreeControls;
        };
    }
}

export default function Welcome_globe({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const [showDemoModal, setShowDemoModal] = useState(false);

    return (
        <>
            <Head title="Tracking | Export Import">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="relative min-h-screen overflow-hidden bg-black">
                {/* Animated background stars */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute w-1 h-1 bg-white rounded-full animate-twinkle" style={{top: '10%', left: '20%', animationDelay: '0s'}}></div>
                    <div className="absolute w-1 h-1 bg-white rounded-full animate-twinkle" style={{top: '20%', left: '80%', animationDelay: '0.5s'}}></div>
                    <div className="absolute w-1 h-1 bg-blue-300 rounded-full animate-twinkle" style={{top: '40%', left: '10%', animationDelay: '1s'}}></div>
                    <div className="absolute w-1 h-1 bg-white rounded-full animate-twinkle" style={{top: '60%', left: '90%', animationDelay: '1.5s'}}></div>
                    <div className="absolute w-1 h-1 bg-blue-200 rounded-full animate-twinkle" style={{top: '80%', left: '30%', animationDelay: '2s'}}></div>
                    <div className="absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle" style={{top: '15%', left: '50%', animationDelay: '0.3s'}}></div>
                    <div className="absolute w-0.5 h-0.5 bg-blue-100 rounded-full animate-twinkle" style={{top: '70%', left: '70%', animationDelay: '1.2s'}}></div>
                    <div className="absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle" style={{top: '30%', left: '60%', animationDelay: '0.8s'}}></div>
                </div>

                <div className="relative z-10 flex min-h-screen flex-col items-center p-6 text-white lg:p-8">
                    {/* HEADER */}
                    <header className="w-full max-w-7xl mb-12">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center font-bold text-xl">
                                    GT
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold">GlobalTracking</h2>
                                    <p className="text-xs text-zinc-400">Export • Import Solutions</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                {auth.user ? (
                                    <a
                                        href='/dashboard'
                                        className="inline-block rounded-lg border border-blue-500/30 bg-blue-500/10 px-6 py-2 text-sm font-medium text-blue-400 hover:bg-blue-500/20 hover:border-blue-400/50 transition-all"
                                    >
                                        Dashboard
                                    </a>
                                ) : (
                                    <>
                                        <a
                                            href='/admin/login'
                                            className="inline-block px-6 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                                        >
                                            Sign In
                                        </a>
                                        {canRegister && (
                                            <Link
                                                href='/register'
                                                className="inline-block rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 text-sm font-medium text-white hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/20"
                                            >
                                                Get Started
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </nav>
                    </header>

                    {/* HERO SECTION */}
                    <div className="w-full max-w-7xl flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                        {/* Left Content */}
                        <div className="flex-1 space-y-4 text-center lg:text-left z-20">
                            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                                🌍 Connecting Global
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                                <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                                    Global Tracking
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                    Simplified
                                </span>
                            </h1>
                            <p className="text-md md:text-l text-zinc-400 max-w-xl">
                                International trade operations with a comprehensive insight.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                                <a
                                    href='/tracking'
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50"
                                >
                                    Start Tracking Now
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </a>
                                <button
                                    onClick={() => setShowDemoModal(true)}
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-zinc-700 text-zinc-300 font-semibold hover:bg-zinc-800/50 hover:border-zinc-600 transition-all"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Watch Demo
                                </button>
                            </div>
                            {/* <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8 text-sm">
                                <div>
                                    <div className="text-3xl font-bold text-blue-400">150+</div>
                                    <div className="text-zinc-500">Countries</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-blue-400">50K+</div>
                                    <div className="text-zinc-500">Active Traders</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold text-blue-400">$2B+</div>
                                    <div className="text-zinc-500">Trade Volume</div>
                                </div>
                            </div> */}
                        </div>

                        {/* Right Content - Globe (Fullscreen) */}
                        <div className="fixed inset-0 z-0" style={{pointerEvents: 'none'}}>
                            <Globe />
                        </div>
                    </div>
                </div>
            </div>

            {/* Demo Video Modal */}
            {showDemoModal && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={() => setShowDemoModal(false)}
                >
                    <div
                        className="relative w-full max-w-4xl mx-4 bg-zinc-900 rounded-2xl overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                            <h3 className="text-xl font-semibold text-white">Platform Demo</h3>
                            <button
                                onClick={() => setShowDemoModal(false)}
                                className="p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                            >
                                <svg className="w-6 h-6 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="aspect-video bg-zinc-950 flex items-center justify-center">
                            <div className="text-center p-8">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M8 5v14l11-7z"/>
                                    </svg>
                                </div>
                                <h4 className="text-2xl font-bold text-white mb-2">Coming Soon</h4>
                                <p className="text-zinc-400 max-w-md mx-auto">
                                    Our platform demo video is currently in production.
                                    Sign up to be notified when it's ready!
                                </p>
                                <Link
                                    href={register()}
                                    className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-colors"
                                >
                                    Get Notified
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
                            <div className="flex flex-wrap gap-4 justify-center text-sm text-zinc-500">
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Duration: ~5 min
                                </span>
                                <span className="flex items-center gap-1">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                    </svg>
                                    Available in: EN, ID
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                @keyframes twinkle {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.5); }
                }
                .animate-twinkle {
                    animation: twinkle 3s ease-in-out infinite;
                }
            `}</style>
        </>
    );
}

/* ==========================
   GLOBE COMPONENT
========================== */

function Globe() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<ThreeRenderer | null>(null);
    const sceneRef = useRef<ThreeObject3D | null>(null);
    const cameraRef = useRef<ThreeCamera | null>(null);
    const controlsRef = useRef<ThreeControls | null>(null);
    const globeRef = useRef<ThreeMesh | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let animationId: number;
        let cleanup: (() => void) | null = null;

        const scriptExists = (src: string) => {
            return document.querySelector(`script[src="${src}"]`) !== null;
        };

        const THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        const ORBIT_URL = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js';

        const loadScripts = () => {
            return new Promise<void>((resolve, reject) => {
                if (window.THREE && window.THREE.OrbitControls) {
                    resolve();
                    return;
                }

                if (!window.THREE) {
                    if (scriptExists(THREE_URL)) {
                        const checkThree = setInterval(() => {
                            if (window.THREE) {
                                clearInterval(checkThree);
                                loadOrbitControls();
                            }
                        }, 50);
                        return;
                    }

                    const threeScript = document.createElement('script');
                    threeScript.src = THREE_URL;
                    threeScript.async = false;
                    threeScript.onload = () => {
                        loadOrbitControls();
                    };
                    threeScript.onerror = () => reject(new Error('Failed to load Three.js'));
                    document.head.appendChild(threeScript);
                } else {
                    loadOrbitControls();
                }

                function loadOrbitControls() {
                    if (window.THREE.OrbitControls) {
                        resolve();
                        return;
                    }

                    if (scriptExists(ORBIT_URL)) {
                        const checkOrbit = setInterval(() => {
                            if (window.THREE.OrbitControls) {
                                clearInterval(checkOrbit);
                                resolve();
                            }
                        }, 50);
                        return;
                    }

                    const orbitScript = document.createElement('script');
                    orbitScript.src = ORBIT_URL;
                    orbitScript.async = false;
                    orbitScript.onload = () => {
                        resolve();
                    };
                    orbitScript.onerror = () => reject(new Error('Failed to load OrbitControls'));
                    document.head.appendChild(orbitScript);
                }
            });
        };

        const checkDarkMode = () => {
            return document.documentElement.classList.contains('dark') ||
                   window.matchMedia('(prefers-color-scheme: dark)').matches;
        };

        const initGlobe = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            const scene = new window.THREE.Scene();
            sceneRef.current = scene;

            const camera = new window.THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
            camera.position.set(0, 0, 4.5);
            cameraRef.current = camera;

            const renderer = new window.THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
                powerPreference: "high-performance"
            });
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setClearColor(0x000000, 0);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = window.THREE.PCFSoftShadowMap;
            container.appendChild(renderer.domElement);
            rendererRef.current = renderer;

            const OrbitControls = window.THREE.OrbitControls!;
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.enableZoom = true;
            controls.enablePan = false;
            controls.minDistance = 3;
            controls.maxDistance = 8;
            controls.rotateSpeed = 0.5;
            controls.zoomSpeed = 0.8;
            controls.autoRotate = true;
            controls.autoRotateSpeed = 1.5;
            controlsRef.current = controls;

            let isDarkMode = checkDarkMode();

            // ==========================================
            // MAIN GLOBE
            // ==========================================

            const globeGeometry = new window.THREE.SphereGeometry(1.8, 64, 64);
            const globeMaterial = new window.THREE.MeshBasicMaterial({
                color: 0x020d1f,
                transparent: true,
                opacity: 0.85,
            });
            const globe = new window.THREE.Mesh(globeGeometry, globeMaterial);
            scene.add(globe);
            globeRef.current = globe;

            // Globe Grid Lines
            const gridGroup = new window.THREE.Group();
            scene.add(gridGroup);

            for (let lat = -80; lat <= 80; lat += 20) {
                const latRad = (lat * Math.PI) / 180;
                const radius = 1.82 * Math.cos(latRad);
                const y = 1.82 * Math.sin(latRad);

                const latGeometry = new window.THREE.BufferGeometry();
                const latPoints = [];
                for (let lng = 0; lng <= 360; lng += 5) {
                    const lngRad = (lng * Math.PI) / 180;
                    latPoints.push(radius * Math.cos(lngRad), y, radius * Math.sin(lngRad));
                }
                latGeometry.setAttribute('position', new window.THREE.BufferAttribute(new Float32Array(latPoints), 3));
                const latLine = new window.THREE.Line(
                    latGeometry,
                    new window.THREE.LineBasicMaterial({
                        color: 0x00ffff,
                        transparent: true,
                        opacity: 0
                    })
                );
                gridGroup.add(latLine);
            }

            for (let lng = 0; lng < 360; lng += 30) {
                const lngRad = (lng * Math.PI) / 180;
                const lngGeometry = new window.THREE.BufferGeometry();
                const lngPoints = [];
                for (let lat = -90; lat <= 90; lat += 5) {
                    const latRad = (lat * Math.PI) / 180;
                    const radius = 1.82;
                    lngPoints.push(
                        radius * Math.cos(latRad) * Math.cos(lngRad),
                        radius * Math.sin(latRad),
                        radius * Math.cos(latRad) * Math.sin(lngRad)
                    );
                }
                lngGeometry.setAttribute('position', new window.THREE.BufferAttribute(new Float32Array(lngPoints), 3));
                const lngLine = new window.THREE.Line(
                    lngGeometry,
                    new window.THREE.LineBasicMaterial({
                        color: 0x00ffff,
                        transparent: true,
                        opacity: 0
                    })
                );
                gridGroup.add(lngLine);
            }

            // ==========================================
            // ATMOSPHERE
            // ==========================================

            const atmosphereGeometry = new window.THREE.SphereGeometry(1.85, 64, 64);
            const atmosphereMaterial = new window.THREE.MeshBasicMaterial({
                color: 0x1a6fff,
                transparent: true,
                opacity: 0.04,
                side: window.THREE.BackSide
            });
            const atmosphere = new window.THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
            scene.add(atmosphere);

            const outerGlowGeometry = new window.THREE.SphereGeometry(2.0, 32, 32);
            const outerGlowMaterial = new window.THREE.MeshBasicMaterial({
                color: 0x0044cc,
                transparent: true,
                opacity: 0.03,
                side: window.THREE.BackSide
            });
            const outerGlow = new window.THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
            scene.add(outerGlow);

            // (city nodes, attack arcs, data packets dihapus)

            // (cyber particles dihapus)

            // (pulse waves dihapus)

            // (shield rings dihapus)

            // (lighting tidak diperlukan karena MeshBasicMaterial)

            // ==========================================
            // STARS
            // ==========================================

            const starsGeometry = new window.THREE.BufferGeometry();
            const starCount = 2000;
            const starPositions = new Float32Array(starCount * 3);
            const starColors = new Float32Array(starCount * 3);
            for (let i = 0; i < starCount; i++) {
                const i3 = i * 3;
                const radius = 50 + Math.random() * 100;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                starPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
                starPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                starPositions[i3 + 2] = radius * Math.cos(phi);
                const brightness = 0.5 + Math.random() * 0.5;
                starColors[i3] = brightness;
                starColors[i3 + 1] = brightness;
                starColors[i3 + 2] = brightness + Math.random() * 0.2;
            }
            starsGeometry.setAttribute('position', new window.THREE.BufferAttribute(starPositions, 3));
            starsGeometry.setAttribute('color', new window.THREE.BufferAttribute(starColors, 3));
            const starsMaterial = new window.THREE.PointsMaterial({
                size: 0.5, vertexColors: true, transparent: true,
                opacity: isDarkMode ? 0.8 : 0.3, sizeAttenuation: true
            });
            const starField = new window.THREE.Points(starsGeometry, starsMaterial);
            scene.add(starField);

            // ==========================================
            // COUNTRY BORDERS
            // ==========================================

            const bordersGroup = new window.THREE.Group();
            scene.add(bordersGroup);

            // ==========================================
            // THEME
            // ==========================================

            let time = 0;

            const updateTheme = (dark: boolean) => {
                isDarkMode = dark;
                globeMaterial.color.setHex(0x020d1f);
                globeMaterial.needsUpdate = true;
                atmosphereMaterial.color.setHex(0x1a6fff);
                atmosphereMaterial.opacity = 0.04;
                atmosphereMaterial.needsUpdate = true;
                outerGlowMaterial.color.setHex(0x0044cc);
                outerGlowMaterial.opacity = 0.03;
                outerGlowMaterial.needsUpdate = true;
                starsMaterial.opacity = dark ? 0.8 : 0.3;
                starsMaterial.needsUpdate = true;
                gridGroup.children.forEach((child: ThreeObject3D) => {
                    if (child.material) {
                        child.material.opacity = 0;
                        child.material.needsUpdate = true;
                    }
                });
                bordersGroup.children.forEach((child: ThreeObject3D) => {
                    if (child.material) {
                        (child.material as any).color.setHex(0x38bdf8);
                        child.material.opacity = 0.85;
                        child.material.needsUpdate = true;
                    }
                });
            };

            const observer = new MutationObserver(() => {
                const newDarkMode = checkDarkMode();
                if (newDarkMode !== isDarkMode) updateTheme(newDarkMode);
            });
            observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const themeChangeHandler = () => {
                const newDarkMode = checkDarkMode();
                if (newDarkMode !== isDarkMode) updateTheme(newDarkMode);
            };
            darkModeQuery.addEventListener('change', themeChangeHandler);

            // ==========================================
            // DRAW COUNTRY BORDERS — FIXED
            // ==========================================

            function drawCountryBorders(feature: GeoFeature, group: ThreeObject3D, dark: boolean) {
    const BORDER_RADIUS = 1.82;
 
    function latLngToXYZ(lng: number, lat: number, radius: number) {
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lng + 180) * (Math.PI / 180);
        return {
            x: -(radius * Math.sin(phi) * Math.cos(theta)),
            y: radius * Math.cos(phi),
            z: radius * Math.sin(phi) * Math.sin(theta)
        };
    }
 
    // Mengubah garis koordinat menjadi titik-titik (dots) yang tersebar merata
    function drawDotsFromCoords(coords: number[][], radius: number) {
        if (coords.length < 2) return;
 
        const dotPositions: number[] = [];
        const DOT_SPACING = 0.015; // Jarak antar titik dalam satuan 3D
 
        for (let i = 0; i < coords.length - 1; i++) {
            const [lng1, lat1] = coords[i];
            const [lng2, lat2] = coords[i + 1];
 
            const p1 = latLngToXYZ(lng1, lat1, radius);
            const p2 = latLngToXYZ(lng2, lat2, radius);
 
            // Hitung jarak segmen
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dz = p2.z - p1.z;
            const segmentLength = Math.sqrt(dx * dx + dy * dy + dz * dz);
 
            // Jumlah titik berdasarkan panjang segmen
            const numDots = Math.max(1, Math.floor(segmentLength / DOT_SPACING));
 
            for (let j = 0; j <= numDots; j++) {
                const t = j / numDots;
                // Interpolasi posisi
                let x = p1.x + dx * t;
                let y = p1.y + dy * t;
                let z = p1.z + dz * t;
 
                // Normalisasi ke permukaan bola
                const len = Math.sqrt(x * x + y * y + z * z);
                x = (x / len) * radius;
                y = (y / len) * radius;
                z = (z / len) * radius;
 
                    dotPositions.push(x, y, z);
                }
            }
    
            if (dotPositions.length === 0) return;
    
            // Buat BufferGeometry untuk semua titik sekaligus
            const geometry = new window.THREE.BufferGeometry();
            geometry.setAttribute(
                'position',
                new window.THREE.BufferAttribute(new Float32Array(dotPositions), 3)
            );
    
            const material = new window.THREE.PointsMaterial({
                size: 0.008,
                color: dark ? 0x38bdf8 : 0x0ea5e9,
                transparent: true,
                opacity: dark ? 0.85 : 0.7,
                sizeAttenuation: true,
                depthWrite: false,
                blending: window.THREE.AdditiveBlending,
            });
    
            const dots = new window.THREE.Points(geometry, material);
            group.add(dots);
        }
    
        const coordinates = feature.geometry.coordinates;
    
        if (feature.geometry.type === 'Polygon') {
            const rings = coordinates as number[][][];
            drawDotsFromCoords(rings[0], BORDER_RADIUS);
        } else if (feature.geometry.type === 'MultiPolygon') {
            const polys = coordinates as number[][][][];
            polys.forEach(polygon => {
                drawDotsFromCoords(polygon[0], BORDER_RADIUS);
            });
        }
    }

            // Fetch and render country borders
            fetch('/geo', {
                method: 'GET',
                headers: { 'Accept': 'application/json' },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.type === 'FeatureCollection' && data.features) {
                        data.features.forEach((feature: GeoFeature) => {
                            if (feature.geometry && feature.geometry.coordinates) {
                                drawCountryBorders(feature, bordersGroup, isDarkMode);
                            }
                        });
                        console.log('Loaded ' + data.features.length + ' countries');
                    }
                })
                .catch(error => console.error('Error loading countries:', error));

            // ==========================================
            // ANIMATION LOOP
            // ==========================================

            const animate = () => {
                animationId = requestAnimationFrame(animate);
                time += 0.016;
                controls.update();

                starField.rotation.y += 0.00005;

                atmosphereMaterial.opacity = 0.04 + Math.sin(time) * 0.01;
                outerGlowMaterial.opacity = 0.03 + Math.sin(time * 0.7) * 0.01;

                renderer.render(scene, camera);
            };
            animate();

            const handleResize = () => {
                const newWidth = window.innerWidth;
                const newHeight = window.innerHeight;
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
            };
            window.addEventListener('resize', handleResize);
            handleResize();

            cleanup = () => {
                cancelAnimationFrame(animationId);
                window.removeEventListener('resize', handleResize);
                darkModeQuery.removeEventListener('change', themeChangeHandler);
                observer.disconnect();
                controls.dispose();
                renderer.dispose();
                if (container && renderer.domElement) {
                    container.removeChild(renderer.domElement);
                }
            };
        };

        loadScripts()
            .then(() => { initGlobe(); })
            .catch((error) => { console.error('Failed to load 3D libraries:', error); });

        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full"
            style={{ width: '100%', height: '100%' }}
        />
    );
}