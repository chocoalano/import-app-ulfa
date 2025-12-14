import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from "react";

// Three.js type definitions for CDN-loaded library
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

interface ThreeCurve {
    getPoints: (divisions: number) => unknown[];
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
            Vector3: new (x: number, y: number, z: number) => unknown;
            CatmullRomCurve3: new (points: unknown[]) => ThreeCurve;
            LineBasicMaterial: new (params: unknown) => ThreeMaterial;
            Line: new (geometry: unknown, material: unknown) => ThreeMesh;
            DoubleSide: number;
            BackSide: number;
            FrontSide: number;
            AdditiveBlending: number;
            PCFSoftShadowMap: number;
            OrbitControls?: new (camera: ThreeCamera, domElement: HTMLElement) => ThreeControls;
        };
    }
}

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;
    const [showDemoModal, setShowDemoModal] = useState(false);

    return (
        <>
            <Head title="Global Trade Solutions | Export Import">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-zinc-950 via-blue-950/20 to-zinc-900 dark:from-black dark:via-blue-950/30 dark:to-zinc-950">
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
                                    <h2 className="text-lg font-bold">GlobalTrade</h2>
                                    <p className="text-xs text-zinc-400">Export • Import Solutions</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-6">
                                {auth.user ? (
                                    <Link
                                        href={dashboard()}
                                        className="inline-block rounded-lg border border-blue-500/30 bg-blue-500/10 px-6 py-2 text-sm font-medium text-blue-400 hover:bg-blue-500/20 hover:border-blue-400/50 transition-all"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="inline-block px-6 py-2 text-sm font-medium text-zinc-300 hover:text-white transition-colors"
                                        >
                                            Sign In
                                        </Link>
                                        {canRegister && (
                                            <Link
                                                href={register()}
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
                        <div className="flex-1 space-y-6 text-center lg:text-left z-20">
                            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
                                🌍 Connecting Global Markets
                            </div>
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                                <span className="bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
                                    Global Trade
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                                    Simplified
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl">
                                Streamline your international trade operations with our comprehensive export-import solutions. Connect with verified suppliers and buyers worldwide.
                            </p>
                            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
                                <Link
                                    href={register()}
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50"
                                >
                                    Start Trading Now
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
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
                            <div className="flex flex-wrap gap-8 justify-center lg:justify-start pt-8 text-sm">
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
                            </div>
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
                        {/* Modal Header */}
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

                        {/* Video Content */}
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

                        {/* Modal Footer */}
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

        // Check if script already exists in DOM
        const scriptExists = (src: string) => {
            return document.querySelector(`script[src="${src}"]`) !== null;
        };

        const THREE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
        const ORBIT_URL = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js';

        // Dynamically load scripts in correct order
        const loadScripts = () => {
            return new Promise<void>((resolve, reject) => {
                // Check if already loaded
                if (window.THREE && window.THREE.OrbitControls) {
                    resolve();
                    return;
                }

                // Load Three.js first
                if (!window.THREE) {
                    // Check if script tag already exists
                    if (scriptExists(THREE_URL)) {
                        // Wait for it to load
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
                        console.log('Three.js loaded');
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

                    // Check if script tag already exists
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
                        console.log('OrbitControls loaded');
                        resolve();
                    };
                    orbitScript.onerror = () => reject(new Error('Failed to load OrbitControls'));
                    document.head.appendChild(orbitScript);
                }
            });
        };

        // Check for dark mode - supports both class-based and media query
        const checkDarkMode = () => {
            return document.documentElement.classList.contains('dark') ||
                   window.matchMedia('(prefers-color-scheme: dark)').matches;
        };

        const initGlobe = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            const scene = new window.THREE.Scene();
            sceneRef.current = scene;

            // Camera positioned for better globe view
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
            controls.autoRotateSpeed = 0.3;
            controlsRef.current = controls;

            let isDarkMode = checkDarkMode();

            // ==========================================
            // MAIN GLOBE - CYBER WAR VISUALIZATION
            // ==========================================

            // Earth Globe - solid with hex grid pattern effect
            const globeGeometry = new window.THREE.SphereGeometry(1.8, 64, 64);
            const globeMaterial = new window.THREE.MeshStandardMaterial({
                color: isDarkMode ? 0x0a1a2e : 0x1a5f8a,
                metalness: 0.3,
                roughness: 0.7,
                transparent: false,
                emissive: isDarkMode ? 0x001833 : 0x0a3d5c,
                emissiveIntensity: 0.4
            });
            const globe = new window.THREE.Mesh(globeGeometry, globeMaterial);
            scene.add(globe);
            globeRef.current = globe;

            // Globe Grid Lines - Latitude/Longitude wireframe
            const gridGroup = new window.THREE.Group();
            scene.add(gridGroup);

            // Create latitude lines
            for (let lat = -80; lat <= 80; lat += 20) {
                const latRad = (lat * Math.PI) / 180;
                const radius = 1.82 * Math.cos(latRad);
                const y = 1.82 * Math.sin(latRad);

                const latGeometry = new window.THREE.BufferGeometry();
                const latPoints = [];
                for (let lng = 0; lng <= 360; lng += 5) {
                    const lngRad = (lng * Math.PI) / 180;
                    latPoints.push(
                        radius * Math.cos(lngRad),
                        y,
                        radius * Math.sin(lngRad)
                    );
                }
                latGeometry.setAttribute('position', new window.THREE.BufferAttribute(new Float32Array(latPoints), 3));
                const latLine = new window.THREE.Line(
                    latGeometry,
                    new window.THREE.LineBasicMaterial({
                        color: isDarkMode ? 0x00ffff : 0x0088aa,
                        transparent: true,
                        opacity: isDarkMode ? 0.15 : 0.1
                    })
                );
                gridGroup.add(latLine);
            }

            // Create longitude lines
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
                        color: isDarkMode ? 0x00ffff : 0x0088aa,
                        transparent: true,
                        opacity: isDarkMode ? 0.15 : 0.1
                    })
                );
                gridGroup.add(lngLine);
            }

            // ==========================================
            // ATMOSPHERE GLOW EFFECT
            // ==========================================

            // Inner glow atmosphere
            const atmosphereGeometry = new window.THREE.SphereGeometry(1.85, 64, 64);
            const atmosphereMaterial = new window.THREE.MeshBasicMaterial({
                color: isDarkMode ? 0x00aaff : 0x66ccff,
                transparent: true,
                opacity: isDarkMode ? 0.15 : 0.1,
                side: window.THREE.BackSide
            });
            const atmosphere = new window.THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
            scene.add(atmosphere);

            // Outer glow
            const outerGlowGeometry = new window.THREE.SphereGeometry(2.0, 32, 32);
            const outerGlowMaterial = new window.THREE.MeshBasicMaterial({
                color: isDarkMode ? 0x0066ff : 0x44aaff,
                transparent: true,
                opacity: isDarkMode ? 0.08 : 0.05,
                side: window.THREE.BackSide
            });
            const outerGlow = new window.THREE.Mesh(outerGlowGeometry, outerGlowMaterial);
            scene.add(outerGlow);

            // ==========================================
            // NETWORK WAR - ATTACK LINES BETWEEN CITIES
            // ==========================================

            // Major city coordinates [lat, lng, name, isAttacker]
            const cityData = [
                { lat: 40.7128, lng: -74.0060, name: 'New York', color: 0x00ff00 },
                { lat: 51.5074, lng: -0.1278, name: 'London', color: 0x00ff00 },
                { lat: 35.6762, lng: 139.6503, name: 'Tokyo', color: 0x00ff00 },
                { lat: 31.2304, lng: 121.4737, name: 'Shanghai', color: 0xff3300 },
                { lat: 55.7558, lng: 37.6173, name: 'Moscow', color: 0xff3300 },
                { lat: 39.9042, lng: 116.4074, name: 'Beijing', color: 0xff3300 },
                { lat: -33.8688, lng: 151.2093, name: 'Sydney', color: 0x00ff00 },
                { lat: 1.3521, lng: 103.8198, name: 'Singapore', color: 0x00ffff },
                { lat: 52.5200, lng: 13.4050, name: 'Berlin', color: 0x00ff00 },
                { lat: 48.8566, lng: 2.3522, name: 'Paris', color: 0x00ff00 },
                { lat: 37.7749, lng: -122.4194, name: 'San Francisco', color: 0x00ff00 },
                { lat: 25.2048, lng: 55.2708, name: 'Dubai', color: 0x00ffff },
                { lat: 19.0760, lng: 72.8777, name: 'Mumbai', color: 0x00ffff },
                { lat: -23.5505, lng: -46.6333, name: 'São Paulo', color: 0x00ff00 },
                { lat: 37.5665, lng: 126.9780, name: 'Seoul', color: 0xff6600 }
            ];

            // Convert lat/lng to 3D position
            const latLngTo3D = (lat: number, lng: number, radius: number) => {
                const phi = (90 - lat) * (Math.PI / 180);
                const theta = (lng + 180) * (Math.PI / 180);
                return {
                    x: -(radius * Math.sin(phi) * Math.cos(theta)),
                    y: radius * Math.cos(phi),
                    z: radius * Math.sin(phi) * Math.sin(theta)
                };
            };

            // City nodes (glowing dots)
            const cityNodesGroup = new window.THREE.Group();
            scene.add(cityNodesGroup);

            cityData.forEach(city => {
                const pos = latLngTo3D(city.lat, city.lng, 1.82);

                // City node geometry
                const nodeGeometry = new window.THREE.SphereGeometry(0.025, 16, 16);
                const nodeMaterial = new window.THREE.MeshBasicMaterial({
                    color: city.color,
                    transparent: true,
                    opacity: 1
                });
                const node = new window.THREE.Mesh(nodeGeometry, nodeMaterial);
                node.position.set(pos.x, pos.y, pos.z);
                cityNodesGroup.add(node);

                // Glow ring around city
                const ringGeometry = new window.THREE.BufferGeometry();
                const ringPoints = [];
                for (let i = 0; i <= 32; i++) {
                    const angle = (i / 32) * Math.PI * 2;
                    ringPoints.push(Math.cos(angle) * 0.05, Math.sin(angle) * 0.05, 0);
                }
                ringGeometry.setAttribute('position', new window.THREE.BufferAttribute(new Float32Array(ringPoints), 3));
                const ring = new window.THREE.Line(
                    ringGeometry,
                    new window.THREE.LineBasicMaterial({
                        color: city.color,
                        transparent: true,
                        opacity: 0.6
                    })
                );
                ring.position.set(pos.x, pos.y, pos.z);
                ring.lookAt(0, 0, 0);
                cityNodesGroup.add(ring);
            });

            // ==========================================
            // ATTACK ARCS - Network War Visualization
            // ==========================================

            const attackLinesGroup = new window.THREE.Group();
            scene.add(attackLinesGroup);

            // Attack connections (attacker -> target)
            const attacks = [
                { from: 4, to: 0 },  // Moscow -> NY
                { from: 5, to: 1 },  // Beijing -> London
                { from: 3, to: 6 },  // Shanghai -> Sydney
                { from: 14, to: 10 }, // Seoul -> SF
                { from: 4, to: 8 },  // Moscow -> Berlin
                { from: 5, to: 2 },  // Beijing -> Tokyo
                { from: 3, to: 11 }, // Shanghai -> Dubai
                { from: 4, to: 9 }   // Moscow -> Paris
            ];

            // Create curved attack arc
            const createAttackArc = (fromCity: typeof cityData[0], toCity: typeof cityData[0], attackColor: number) => {
                const from = latLngTo3D(fromCity.lat, fromCity.lng, 1.82);
                const to = latLngTo3D(toCity.lat, toCity.lng, 1.82);

                // Calculate midpoint and lift it for arc
                const mid = {
                    x: (from.x + to.x) / 2,
                    y: (from.y + to.y) / 2,
                    z: (from.z + to.z) / 2
                };

                // Normalize and extend for arc height
                const midLength = Math.sqrt(mid.x * mid.x + mid.y * mid.y + mid.z * mid.z);
                const arcHeight = 2.3 + Math.random() * 0.3;
                mid.x = (mid.x / midLength) * arcHeight;
                mid.y = (mid.y / midLength) * arcHeight;
                mid.z = (mid.z / midLength) * arcHeight;

                const curve = new window.THREE.CatmullRomCurve3([
                    new window.THREE.Vector3(from.x, from.y, from.z),
                    new window.THREE.Vector3(mid.x, mid.y, mid.z),
                    new window.THREE.Vector3(to.x, to.y, to.z)
                ]);

                const points = curve.getPoints(50);
                const geometry = new window.THREE.BufferGeometry().setFromPoints(points);

                const material = new window.THREE.LineBasicMaterial({
                    color: attackColor,
                    transparent: true,
                    opacity: isDarkMode ? 0.7 : 0.5,
                    blending: window.THREE.AdditiveBlending
                });

                return { line: new window.THREE.Line(geometry, material), curve, points };
            };

            // Store attack arcs for animation
            interface AttackArc {
                line: ThreeMesh;
                curve: ThreeCurve;
                points: unknown[];
                progress: number;
                speed: number;
                color: number;
            }
            const attackArcs: AttackArc[] = [];

            attacks.forEach(attack => {
                const fromCity = cityData[attack.from];
                const toCity = cityData[attack.to];
                const attackColor = fromCity.color;
                const arc = createAttackArc(fromCity, toCity, attackColor);
                attackLinesGroup.add(arc.line);
                attackArcs.push({
                    ...arc,
                    progress: Math.random(),
                    speed: 0.005 + Math.random() * 0.01,
                    color: attackColor
                });
            });

            // ==========================================
            // DATA PACKETS - Moving along attack arcs
            // ==========================================

            const dataPacketsGroup = new window.THREE.Group();
            scene.add(dataPacketsGroup);

            // Create data packet for each attack
            interface DataPacket {
                mesh: ThreeMesh;
                trail: ThreeMesh;
                arcIndex: number;
                progress: number;
                speed: number;
            }
            const dataPackets: DataPacket[] = [];

            attackArcs.forEach((arc, index) => {
                // Main packet
                const packetGeometry = new window.THREE.SphereGeometry(0.02, 8, 8);
                const packetMaterial = new window.THREE.MeshBasicMaterial({
                    color: arc.color,
                    transparent: true,
                    opacity: 1
                });
                const packet = new window.THREE.Mesh(packetGeometry, packetMaterial);
                dataPacketsGroup.add(packet);

                // Packet trail
                const trailGeometry = new window.THREE.BufferGeometry();
                const trailPositions = new Float32Array(30 * 3);
                trailGeometry.setAttribute('position', new window.THREE.BufferAttribute(trailPositions, 3));
                const trailMaterial = new window.THREE.LineBasicMaterial({
                    color: arc.color,
                    transparent: true,
                    opacity: 0.5,
                    blending: window.THREE.AdditiveBlending
                });
                const trail = new window.THREE.Line(trailGeometry, trailMaterial);
                dataPacketsGroup.add(trail);

                dataPackets.push({
                    mesh: packet,
                    trail,
                    arcIndex: index,
                    progress: Math.random(),
                    speed: 0.008 + Math.random() * 0.012
                });
            });

            // ==========================================
            // CYBER PARTICLES - Floating around globe
            // ==========================================

            const cyberParticlesGeometry = new window.THREE.BufferGeometry();
            const cyberParticleCount = 200;
            const cyberPositions = new Float32Array(cyberParticleCount * 3);
            const cyberColors = new Float32Array(cyberParticleCount * 3);
            const cyberSpeeds = new Float32Array(cyberParticleCount);
            const cyberPhases = new Float32Array(cyberParticleCount);

            for (let i = 0; i < cyberParticleCount; i++) {
                const i3 = i * 3;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const radius = 2.0 + Math.random() * 0.5;

                cyberPositions[i3] = radius * Math.sin(phi) * Math.cos(theta);
                cyberPositions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                cyberPositions[i3 + 2] = radius * Math.cos(phi);

                const colorType = Math.random();
                if (colorType < 0.4) {
                    cyberColors[i3] = 0; cyberColors[i3 + 1] = 1; cyberColors[i3 + 2] = 1;
                } else if (colorType < 0.7) {
                    cyberColors[i3] = 0; cyberColors[i3 + 1] = 1; cyberColors[i3 + 2] = 0.5;
                } else {
                    cyberColors[i3] = 1; cyberColors[i3 + 1] = 0.3; cyberColors[i3 + 2] = 0;
                }

                cyberSpeeds[i] = 0.5 + Math.random() * 1.5;
                cyberPhases[i] = Math.random() * Math.PI * 2;
            }

            cyberParticlesGeometry.setAttribute('position', new window.THREE.BufferAttribute(cyberPositions, 3));
            cyberParticlesGeometry.setAttribute('color', new window.THREE.BufferAttribute(cyberColors, 3));

            const cyberParticlesMaterial = new window.THREE.PointsMaterial({
                size: 0.03,
                vertexColors: true,
                transparent: true,
                opacity: isDarkMode ? 0.8 : 0.5,
                blending: window.THREE.AdditiveBlending,
                depthWrite: false
            });

            const cyberParticles = new window.THREE.Points(cyberParticlesGeometry, cyberParticlesMaterial);
            scene.add(cyberParticles);

            // ==========================================
            // PULSE WAVES - Attack Impact Visualization
            // ==========================================

            interface PulseWave {
                mesh: ThreeMesh;
                scale: number;
                opacity: number;
                maxScale: number;
            }
            const pulseWaves: PulseWave[] = [];

            // Create multiple pulse waves at random city locations
            for (let i = 0; i < 5; i++) {
                const city = cityData[Math.floor(Math.random() * cityData.length)];
                const pos = latLngTo3D(city.lat, city.lng, 1.82);

                const pulseGeometry = new window.THREE.SphereGeometry(0.1, 16, 16);
                const pulseMaterial = new window.THREE.MeshBasicMaterial({
                    color: city.color === 0xff3300 ? 0xff3300 : 0x00ffff,
                    transparent: true,
                    opacity: 0.5,
                    side: window.THREE.BackSide
                });
                const pulse = new window.THREE.Mesh(pulseGeometry, pulseMaterial);
                pulse.position.set(pos.x, pos.y, pos.z);
                scene.add(pulse);

                pulseWaves.push({
                    mesh: pulse,
                    scale: 1,
                    opacity: 0.5,
                    maxScale: 3 + Math.random() * 2
                });
            }

            // ==========================================
            // SHIELD/DEFENSE RING
            // ==========================================

            const shieldGeometry = new window.THREE.BufferGeometry();
            const shieldPoints = [];
            for (let i = 0; i <= 64; i++) {
                const angle = (i / 64) * Math.PI * 2;
                shieldPoints.push(Math.cos(angle) * 2.1, 0, Math.sin(angle) * 2.1);
            }
            shieldGeometry.setAttribute('position', new window.THREE.BufferAttribute(new Float32Array(shieldPoints), 3));
            const shieldMaterial = new window.THREE.LineBasicMaterial({
                color: isDarkMode ? 0x00ffff : 0x0088ff,
                transparent: true,
                opacity: isDarkMode ? 0.4 : 0.3,
                blending: window.THREE.AdditiveBlending
            });
            const shield1 = new window.THREE.Line(shieldGeometry.clone(), shieldMaterial.clone());
            shield1.rotation.x = Math.PI * 0.1;
            scene.add(shield1);

            const shield2 = new window.THREE.Line(shieldGeometry.clone(), shieldMaterial.clone());
            shield2.rotation.x = Math.PI * 0.5;
            shield2.rotation.y = Math.PI * 0.3;
            scene.add(shield2);

            const shield3 = new window.THREE.Line(shieldGeometry.clone(), shieldMaterial.clone());
            shield3.rotation.z = Math.PI * 0.4;
            scene.add(shield3)

            // ==========================================
            // LIGHTING
            // ==========================================

            const ambientLight = new window.THREE.AmbientLight(
                isDarkMode ? 0x222244 : 0xffffff,
                isDarkMode ? 0.6 : 1.0
            );
            scene.add(ambientLight);

            const mainLight = new window.THREE.DirectionalLight(
                isDarkMode ? 0xffffff : 0xfff5e0,
                isDarkMode ? 1.2 : 1.5
            );
            mainLight.position.set(5, 3, 5);
            scene.add(mainLight);

            const fillLight = new window.THREE.DirectionalLight(
                isDarkMode ? 0x4488ff : 0x89d4ff,
                isDarkMode ? 0.4 : 0.5
            );
            fillLight.position.set(-5, -2, -5);
            scene.add(fillLight);

            // ==========================================
            // STARS BACKGROUND
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
                size: 0.5,
                vertexColors: true,
                transparent: true,
                opacity: isDarkMode ? 0.8 : 0.3,
                sizeAttenuation: true
            });

            const starField = new window.THREE.Points(starsGeometry, starsMaterial);
            scene.add(starField);

            // Country borders group
            const bordersGroup = new window.THREE.Group();
            scene.add(bordersGroup);

            // Animation timing
            let time = 0;

            // Theme update function
            const updateTheme = (dark: boolean) => {
                isDarkMode = dark;

                globeMaterial.color.setHex(dark ? 0x0a1a2e : 0x1a5f8a);
                globeMaterial.emissive?.setHex(dark ? 0x001833 : 0x0a3d5c);
                globeMaterial.needsUpdate = true;

                atmosphereMaterial.color.setHex(dark ? 0x00aaff : 0x66ccff);
                atmosphereMaterial.opacity = dark ? 0.15 : 0.1;
                atmosphereMaterial.needsUpdate = true;

                outerGlowMaterial.color.setHex(dark ? 0x0066ff : 0x44aaff);
                outerGlowMaterial.opacity = dark ? 0.08 : 0.05;
                outerGlowMaterial.needsUpdate = true;

                cyberParticlesMaterial.opacity = dark ? 0.8 : 0.5;
                cyberParticlesMaterial.needsUpdate = true;

                starsMaterial.opacity = dark ? 0.8 : 0.3;
                starsMaterial.needsUpdate = true;

                ambientLight.color.setHex(dark ? 0x222244 : 0xffffff);
                ambientLight.intensity = dark ? 0.6 : 1.0;
                mainLight.intensity = dark ? 1.2 : 1.5;
                fillLight.color.setHex(dark ? 0x4488ff : 0x89d4ff);

                // Update grid opacity
                gridGroup.children.forEach((child: ThreeObject3D) => {
                    if (child.material) {
                        child.material.opacity = dark ? 0.15 : 0.1;
                        child.material.needsUpdate = true;
                    }
                });

                // Update border colors
                bordersGroup.children.forEach((child: ThreeObject3D) => {
                    if (child.material) {
                        child.material.color.setHex(dark ? 0x00ffff : 0x228b22);
                        child.material.opacity = dark ? 0.6 : 0.7;
                        child.material.needsUpdate = true;
                    }
                });
            };

            // Theme observers
            const observer = new MutationObserver(() => {
                const newDarkMode = checkDarkMode();
                if (newDarkMode !== isDarkMode) {
                    updateTheme(newDarkMode);
                }
            });
            observer.observe(document.documentElement, {
                attributes: true,
                attributeFilter: ['class']
            });

            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            const themeChangeHandler = () => {
                const newDarkMode = checkDarkMode();
                if (newDarkMode !== isDarkMode) {
                    updateTheme(newDarkMode);
                }
            };
            darkModeQuery.addEventListener('change', themeChangeHandler);

            // Load country borders
            fetch('/countries.json', {
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

            function drawCountryBorders(feature: GeoFeature, group: ThreeObject3D, dark: boolean) {
                const coordinates = feature.geometry.coordinates;

                function latLngToVector3(lng: number, lat: number, radius: number) {
                    const phi = (90 - lat) * (Math.PI / 180);
                    const theta = (lng + 180) * (Math.PI / 180);
                    const x = -(radius * Math.sin(phi) * Math.cos(theta));
                    const y = radius * Math.cos(phi);
                    const z = radius * Math.sin(phi) * Math.sin(theta);
                    return new window.THREE.Vector3(x, y, z);
                }

                function drawPolygon(coords: number[][], radius: number) {
                    if (coords.length < 2) return;

                    const points: unknown[] = [];
                    coords.forEach(coord => {
                        const [lng, lat] = coord;
                        points.push(latLngToVector3(lng, lat, radius));
                    });

                    const curve = new window.THREE.CatmullRomCurve3(points);
                    const curvePoints = curve.getPoints(points.length * 2);
                    const lineGeometry = new window.THREE.BufferGeometry().setFromPoints(curvePoints);
                    const lineMaterial = new window.THREE.LineBasicMaterial({
                        color: dark ? 0x00ffff : 0x228b22,
                        linewidth: 2,
                        opacity: dark ? 0.6 : 0.7,
                        transparent: true,
                        depthTest: true,
                        depthWrite: false
                    });
                    const line = new window.THREE.Line(lineGeometry, lineMaterial);
                    group.add(line);
                }

                if (feature.geometry.type === 'Polygon') {
                    drawPolygon(coordinates[0] as number[][], 1.83);
                } else if (feature.geometry.type === 'MultiPolygon') {
                    (coordinates as number[][][][]).forEach((polygon) => {
                        drawPolygon(polygon[0], 1.83);
                    });
                }
            }

            // ==========================================
            // ANIMATION LOOP
            // ==========================================

            const animate = () => {
                animationId = requestAnimationFrame(animate);
                time += 0.016;
                controls.update();

                // Rotate stars slowly
                starField.rotation.y += 0.00005;

                // Atmosphere breathing effect
                atmosphereMaterial.opacity = (isDarkMode ? 0.15 : 0.1) + Math.sin(time) * 0.03;
                outerGlowMaterial.opacity = (isDarkMode ? 0.08 : 0.05) + Math.sin(time * 0.7) * 0.02;

                // Rotate shields
                shield1.rotation.y += 0.003;
                shield2.rotation.y -= 0.002;
                shield3.rotation.x += 0.0025;

                // Animate cyber particles
                const cyberPosArray = cyberParticlesGeometry.attributes.position.array as Float32Array;
                for (let i = 0; i < cyberParticleCount; i++) {
                    const i3 = i * 3;
                    cyberPhases[i] += cyberSpeeds[i] * 0.003;

                    const theta = cyberPhases[i];
                    const phi = Math.acos(Math.sin(time * 0.1 + i * 0.1) * 0.3);
                    const radius = 2.0 + Math.sin(time + i) * 0.2;

                    cyberPosArray[i3] = radius * Math.sin(phi) * Math.cos(theta);
                    cyberPosArray[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
                    cyberPosArray[i3 + 2] = radius * Math.cos(phi);
                }
                cyberParticlesGeometry.attributes.position.needsUpdate = true;

                // Animate data packets along attack arcs
                dataPackets.forEach((packet) => {
                    packet.progress += packet.speed;
                    if (packet.progress > 1) {
                        packet.progress = 0;
                    }

                    const arc = attackArcs[packet.arcIndex];
                    const pointIndex = Math.floor(packet.progress * (arc.points.length - 1));
                    const point = arc.points[pointIndex] as { x: number; y: number; z: number };
                    if (point) {
                        packet.mesh.position.set(point.x, point.y, point.z);
                    }
                });

                // Animate pulse waves
                pulseWaves.forEach((pw) => {
                    pw.scale += 0.02;
                    pw.opacity -= 0.008;

                    if (pw.scale > pw.maxScale || pw.opacity <= 0) {
                        pw.scale = 1;
                        pw.opacity = isDarkMode ? 0.5 : 0.3;
                    }

                    pw.mesh.scale.set(pw.scale, pw.scale, pw.scale);
                    pw.mesh.material.opacity = Math.max(0, pw.opacity);
                });

                // Pulse city nodes
                cityNodesGroup.children.forEach((child: ThreeObject3D, i: number) => {
                    if (child.material) {
                        child.material.opacity = 0.6 + Math.sin(time * 3 + i * 0.5) * 0.4;
                    }
                });

                renderer.render(scene, camera);
            };
            animate();

            // Handle resize
            const handleResize = () => {
                const newWidth = window.innerWidth;
                const newHeight = window.innerHeight;
                camera.aspect = newWidth / newHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(newWidth, newHeight);
            };
            window.addEventListener('resize', handleResize);
            handleResize();

            // Cleanup
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
            .then(() => {
                initGlobe();
            })
            .catch((error) => {
                console.error('Failed to load 3D libraries:', error);
            });

        return () => {
            if (cleanup) cleanup();
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className="w-full h-full"
            style={{
                width: '100%',
                height: '100%'
            }}
        />
    );
}
