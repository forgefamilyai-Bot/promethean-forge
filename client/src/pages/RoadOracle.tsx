/* ============================================================
   ROAD ORACLE — AI VEHICLE DIAGNOSTIC SYSTEM
   Promethean Forge Synergies · >|<
   1 (Driver) ~ >|< (Oracle) ~ 1 (Mechanic)
   
   Design: Aviation HUD meets dark industrial instrument panel
   Deep black base · Forge Amber (Driver) · Sovereign Cyan (Mechanic)
   Orbitron + Share Tech Mono typography
   ============================================================ */
import { useState, useEffect, useRef } from "react";

const FORGE_API_URL = import.meta.env.VITE_FRONTEND_FORGE_API_URL;
const FORGE_API_KEY = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;

const DRIVER_SYSTEM = `You are ROAD ORACLE — an AI emergency vehicle diagnostic assistant for non-mechanic drivers stranded on the road. You are calm, warm, reassuring, and action-oriented.

STRICT RULES:
- Ask ONE question at a time. Never multiple questions in one message.
- Use plain language only. Explain any technical term immediately.
- Always address safety BEFORE diagnosis — first message always confirms hazards are on and car is off road.
- Keep responses SHORT: 2-4 sentences max.
- Guide phone placement specifically: "Hold your phone 8 inches from the engine, camera pointing down at the belts"
- When you have enough info, give a VERDICT with one of these ratings on its own line:
  🟢 SAFE TO DRIVE
  🟡 DRIVE WITH CAUTION — [brief reason]
  🔴 DO NOT DRIVE — [brief reason]
  📞 CALL A TOW NOW — [brief reason]
- After verdict, suggest nearest fix action (nearest auto parts store, simple self-fix instruction, etc.)

Gather in order: safety confirmed → year/make/model → primary symptom → sounds/smells/visual → when it started → conditions (hot/cold, speed, braking, etc.)

You have access to acoustic sensor data when the user activates the mic. Interpret described sound patterns: knocking=rod/piston, squealing=belt/brakes, grinding=bearing/brake rotor, hissing=vacuum/coolant leak, clicking=valve train/CV joint.`;

const MECHANIC_SYSTEM = `You are ROAD ORACLE — advanced AI diagnostic assistant for professional automotive technicians.

PROVIDE:
- Precise technical diagnosis with component names, OBD-II code references (Pxx, Cxx, Bxx, Uxx)
- Differential diagnoses ranked by probability percentage
- Specific test procedures with expected values (resistance, voltage, pressure specs)
- Parts needed with OEM and aftermarket cross-reference suggestions
- TSB and recall flags by year/make/model when relevant
- Flat-rate labor time estimates
- Next diagnostic step if primary hypothesis is ruled out

ACOUSTIC INTERPRETATION (when mic sensor active):
- Low-frequency knock (5–15 Hz): crankshaft bearing / rod knock
- Mid-frequency rattle (20–80 Hz): heat shield, loose exhaust, timing chain
- High-frequency squeal (>200 Hz): belt slip, brake pad wear indicator
- Rhythmic tick matching RPM: valve train, injector tick, collapsed lifter
- Hiss at idle: vacuum leak, boost leak, head gasket breach

Be dense, precise, and technical. Mechanics don't need hand-holding — give them the data.`;

const QUICK_DRIVER = ["Won't start", "Overheating", "Strange noise", "Check engine light", "Flat tire", "Smoke / steam"];
const QUICK_MECH = ["No start / crank no start", "Misfire P030x", "O2 sensor fault", "Trans slip", "ABS fault", "Intermittent stall"];

const HUDCorners = ({ color }: { color: string }) => (
  <>
    {[
      { top: 8, left: 8, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
      { top: 8, right: 8, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` },
      { bottom: 8, left: 8, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
      { bottom: 8, right: 8, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` },
    ].map((s, i) => (
      <div key={i} style={{ position: "absolute", width: 16, height: 16, ...s }} />
    ))}
  </>
);

type Screen = "splash" | "mode" | "triage";
type Mode = "driver" | "mechanic" | null;
type Message = { role: "user" | "assistant"; content: string };

export default function RoadOracle() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [mode, setMode] = useState<Mode>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [audioData, setAudioData] = useState<number[]>(new Array(32).fill(4));
  const [cameraOn, setCameraOn] = useState(false);
  const [showCam, setShowCam] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number>(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const camStreamRef = useRef<MediaStream | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const startMic = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const src = audioCtxRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 64;
      src.connect(analyserRef.current);
      setListening(true);
      const tick = () => {
        const arr = new Uint8Array(analyserRef.current!.frequencyBinCount);
        analyserRef.current!.getByteFrequencyData(arr);
        setAudioData(Array.from(arr));
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
      sendToAI("[🎙️ ACOUSTIC SENSOR ACTIVE — microphone is now recording. Please start the engine or describe what you hear while I analyze the audio patterns.]");
    } catch {
      alert("Microphone access is required for acoustic diagnosis. Please allow mic access and try again.");
    }
  };

  const stopMic = () => {
    micStreamRef.current?.getTracks().forEach(t => t.stop());
    cancelAnimationFrame(rafRef.current);
    audioCtxRef.current?.close();
    setListening(false);
    setAudioData(new Array(32).fill(4));
    sendToAI("[🎙️ ACOUSTIC RECORDING COMPLETE — please analyze the audio patterns captured and provide your diagnostic assessment.]");
  };

  const startCam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      camStreamRef.current = stream;
      setShowCam(true);
      setCameraOn(true);
      setTimeout(() => { if (videoRef.current) videoRef.current.srcObject = stream; }, 100);
      sendToAI("[📷 VISUAL SENSOR ACTIVE — camera is pointing at the vehicle. What should I focus on first?]");
    } catch {
      alert("Camera access is required for visual diagnosis. Please allow camera access.");
    }
  };

  const stopCam = () => {
    camStreamRef.current?.getTracks().forEach(t => t.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setShowCam(false);
    setCameraOn(false);
  };

  const sendToAI = async (userMsg: string) => {
    if (!userMsg?.trim() || loading) return;
    const newMsgs: Message[] = [...messages, { role: "user", content: userMsg }];
    setMessages(newMsgs);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch(`${FORGE_API_URL}/api/llm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${FORGE_API_KEY}`,
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1000,
          system: mode === "driver" ? DRIVER_SYSTEM : MECHANIC_SYSTEM,
          messages: newMsgs.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || data.choices?.[0]?.message?.content || "⚡ Signal lost. Please retry.";
      setMessages([...newMsgs, { role: "assistant", content: reply }]);
    } catch {
      setMessages([...newMsgs, { role: "assistant", content: "⚡ Connection error. Check your signal and try again." }]);
    }
    setLoading(false);
  };

  const handleSend = () => { if (input.trim()) sendToAI(input); };

  const resetAll = () => {
    stopCam();
    if (listening) {
      micStreamRef.current?.getTracks().forEach(t => t.stop());
      cancelAnimationFrame(rafRef.current);
      setListening(false);
    }
    setMessages([]);
    setInput("");
    setScreen("mode");
  };

  const startTriage = (m: "driver" | "mechanic") => {
    setMode(m);
    setScreen("triage");
    const greeting = m === "driver"
      ? "ROAD ORACLE online. I'm here — wherever you are, whatever the car.\n\nFirst: are you safely pulled over with your hazard lights flashing?"
      : "ROAD ORACLE online. Mechanic mode active.\n\nGive me Year / Make / Model and the primary symptom. I'll take it from there.";
    setMessages([{ role: "assistant", content: greeting }]);
  };

  const accent = mode === "driver" ? "#F59E0B" : "#06B6D4";
  const accentDim = mode === "driver" ? "rgba(245,158,11,0.12)" : "rgba(6,182,212,0.12)";
  const accentBorder = mode === "driver" ? "rgba(245,158,11,0.3)" : "rgba(6,182,212,0.3)";
  const accentGlow = mode === "driver" ? "rgba(245,158,11,0.4)" : "rgba(6,182,212,0.4)";

  // ─────── SPLASH ───────
  if (screen === "splash") return (
    <div
      onClick={() => setScreen("mode")}
      style={{
        minHeight: "100vh", background: "#060606",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        fontFamily: "'Share Tech Mono', monospace",
        cursor: "pointer", overflow: "hidden", position: "relative",
        userSelect: "none",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
        @keyframes ro-pulse{0%,100%{opacity:.3;transform:translate(-50%,-50%) scale(1);}50%{opacity:.9;transform:translate(-50%,-50%) scale(1.15);}}
        @keyframes ro-up{from{opacity:0;transform:translateY(24px);}to{opacity:1;transform:translateY(0);}}
        @keyframes ro-blink{0%,100%{opacity:1;}50%{opacity:0;}}
        @keyframes ro-ring{0%{transform:scale(1);opacity:.7;}100%{transform:scale(2.8);opacity:0;}}
        @keyframes ro-bar{0%,100%{transform:scaleY(.2);}50%{transform:scaleY(1);}}
      `}</style>

      {/* scan lines */}
      <div style={{ position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(245,158,11,.018) 3px,rgba(245,158,11,.018) 4px)",pointerEvents:"none" }} />

      {/* ambient glow */}
      <div style={{ position:"absolute",width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(245,158,11,.07) 0%,transparent 65%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"ro-pulse 4s ease-in-out infinite" }} />
      <div style={{ position:"absolute",width:300,height:300,borderRadius:"50%",background:"radial-gradient(circle,rgba(6,182,212,.05) 0%,transparent 65%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",animation:"ro-pulse 4s ease-in-out infinite .5s" }} />

      <div style={{ position:"relative",zIndex:1,textAlign:"center" }}>
        {/* orb */}
        <div style={{ width:90,height:90,margin:"0 auto 28px",borderRadius:"50%",background:"radial-gradient(circle,rgba(245,158,11,.1),transparent)",border:"2px solid rgba(245,158,11,.6)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 40px rgba(245,158,11,.3)",position:"relative",animation:"ro-up .8s ease both" }}>
          <span style={{fontSize:36}}>🔮</span>
          <div style={{position:"absolute",inset:-10,borderRadius:"50%",border:"1px solid rgba(245,158,11,.3)",animation:"ro-ring 2s ease-out infinite"}}/>
          <div style={{position:"absolute",inset:-10,borderRadius:"50%",border:"1px solid rgba(245,158,11,.2)",animation:"ro-ring 2s ease-out .7s infinite"}}/>
        </div>

        <div style={{ fontFamily:"'Orbitron',monospace",fontSize:48,fontWeight:900,color:"#F59E0B",letterSpacing:".14em",textShadow:"0 0 30px rgba(245,158,11,.7)",lineHeight:1,animation:"ro-up .8s ease .1s both" }}>ROAD</div>
        <div style={{ fontFamily:"'Orbitron',monospace",fontSize:48,fontWeight:900,color:"#06B6D4",letterSpacing:".14em",textShadow:"0 0 30px rgba(6,182,212,.7)",lineHeight:1,marginBottom:10,animation:"ro-up .8s ease .15s both" }}>ORACLE</div>

        <div style={{ color:"#4B5563",fontSize:10,letterSpacing:".35em",marginBottom:44,animation:"ro-up .8s ease .3s both" }}>AI VEHICLE DIAGNOSTIC SYSTEM</div>

        {/* static waveform */}
        <div style={{ display:"flex",gap:4,justifyContent:"center",marginBottom:48,alignItems:"flex-end",height:30,animation:"ro-up .8s ease .4s both" }}>
          {[4,10,18,26,22,14,8,22,18,12,28,8,18,24,10,4].map((h,i)=>(
            <div key={i} style={{ width:4,height:h,background:`linear-gradient(to top,#F59E0B,#06B6D4)`,borderRadius:2,opacity:.7,transformOrigin:"bottom",animation:`ro-bar ${1+i*.07}s ease-in-out infinite` }}/>
          ))}
        </div>

        <div style={{ color:"#F59E0B",fontSize:12,letterSpacing:".25em",animation:"ro-blink 1.4s ease infinite",fontFamily:"'Share Tech Mono',monospace" }}>[ TAP TO BEGIN ]</div>
      </div>

      <div style={{ position:"absolute",bottom:20,color:"#1F2937",fontSize:10,letterSpacing:".2em",fontFamily:"'Share Tech Mono',monospace" }}>PROMETHEAN FORGE SYNERGIES &nbsp;·&nbsp; &gt;|&lt;</div>
    </div>
  );

  // ─────── MODE SELECT ───────
  if (screen === "mode") return (
    <div style={{ minHeight:"100vh",background:"#060606",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",fontFamily:"'Share Tech Mono',monospace",padding:"24px",position:"relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
        @keyframes ro-up{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
        .ro-card{transition:transform .18s ease,box-shadow .18s ease;cursor:pointer;}
        .ro-card:hover{transform:translateY(-5px);}
        .ro-card:active{transform:scale(.97);}
      `}</style>
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,.01) 3px,rgba(255,255,255,.01) 4px)",pointerEvents:"none"}}/>

      <div style={{ textAlign:"center",marginBottom:36,animation:"ro-up .5s ease both" }}>
        <div style={{ fontFamily:"'Orbitron',monospace",fontSize:11,color:"#F59E0B",letterSpacing:".35em",marginBottom:6 }}>ROAD ORACLE</div>
        <div style={{ fontFamily:"'Orbitron',monospace",fontSize:24,color:"#E5E7EB",fontWeight:700,letterSpacing:".1em" }}>SELECT MODE</div>
        <div style={{ color:"#374151",fontSize:10,letterSpacing:".15em",marginTop:6 }}>WHO ARE YOU IN THIS MOMENT?</div>
      </div>

      {/* DRIVER */}
      <div className="ro-card" onClick={() => startTriage("driver")} style={{ width:"100%",maxWidth:380,background:"linear-gradient(135deg,#0E0E0E,#111827)",border:"1px solid rgba(245,158,11,.35)",borderRadius:14,padding:"26px 24px",marginBottom:14,animation:"ro-up .5s ease .1s both",position:"relative",overflow:"hidden" }}>
        <HUDCorners color="#F59E0B" />
        <div style={{position:"absolute",top:-30,right:-30,width:100,height:100,borderRadius:"50%",background:"radial-gradient(circle,rgba(245,158,11,.06),transparent)",pointerEvents:"none"}}/>
        <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:12 }}>
          <div style={{ width:52,height:52,background:"rgba(245,158,11,.1)",border:"1px solid rgba(245,158,11,.35)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0 }}>🚗</div>
          <div>
            <div style={{ fontFamily:"'Orbitron',monospace",color:"#F59E0B",fontSize:17,fontWeight:700,letterSpacing:".1em" }}>DRIVER</div>
            <div style={{ color:"#6B7280",fontSize:10,marginTop:2,letterSpacing:".1em" }}>I NEED HELP RIGHT NOW</div>
          </div>
        </div>
        <div style={{ color:"#9CA3AF",fontSize:12,lineHeight:1.75,marginBottom:14 }}>
          Plain-language emergency guidance. I'll walk you through it step by step — no mechanic knowledge needed.
        </div>
        <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
          {["🎙️ Acoustic Scan","📷 Visual Inspect","📍 Parts Locator"].map(t => (
            <span key={t} style={{ background:"rgba(245,158,11,.07)",border:"1px solid rgba(245,158,11,.2)",color:"#D97706",fontSize:9,padding:"3px 9px",borderRadius:4,letterSpacing:".05em" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* MECHANIC */}
      <div className="ro-card" onClick={() => startTriage("mechanic")} style={{ width:"100%",maxWidth:380,background:"linear-gradient(135deg,#0E0E0E,#0C1A26)",border:"1px solid rgba(6,182,212,.35)",borderRadius:14,padding:"26px 24px",animation:"ro-up .5s ease .2s both",position:"relative",overflow:"hidden" }}>
        <HUDCorners color="#06B6D4" />
        <div style={{position:"absolute",top:-30,right:-30,width:100,height:100,borderRadius:"50%",background:"radial-gradient(circle,rgba(6,182,212,.05),transparent)",pointerEvents:"none"}}/>
        <div style={{ display:"flex",alignItems:"center",gap:14,marginBottom:12 }}>
          <div style={{ width:52,height:52,background:"rgba(6,182,212,.1)",border:"1px solid rgba(6,182,212,.35)",borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,flexShrink:0 }}>🔧</div>
          <div>
            <div style={{ fontFamily:"'Orbitron',monospace",color:"#06B6D4",fontSize:17,fontWeight:700,letterSpacing:".1em" }}>MECHANIC</div>
            <div style={{ color:"#6B7280",fontSize:10,marginTop:2,letterSpacing:".1em" }}>PROFESSIONAL DIAGNOSTIC MODE</div>
          </div>
        </div>
        <div style={{ color:"#9CA3AF",fontSize:12,lineHeight:1.75,marginBottom:14 }}>
          Full technical data. OBD codes, differential diagnosis, TSB/recalls, torque specs, labor estimates.
        </div>
        <div style={{ display:"flex",gap:6,flexWrap:"wrap" }}>
          {["🔬 FFT Interpret","📊 Differential Dx","📋 TSB / Recall"].map(t => (
            <span key={t} style={{ background:"rgba(6,182,212,.07)",border:"1px solid rgba(6,182,212,.2)",color:"#0891B2",fontSize:9,padding:"3px 9px",borderRadius:4,letterSpacing:".05em" }}>{t}</span>
          ))}
        </div>
      </div>

      <div style={{ marginTop:28,color:"#1F2937",fontSize:9,letterSpacing:".2em" }}>&gt;|&lt; ROAD ORACLE · PROMETHEAN FORGE SYNERGIES</div>
    </div>
  );

  // ─────── TRIAGE ───────
  const quickButtons = mode === "driver" ? QUICK_DRIVER : QUICK_MECH;

  return (
    <div style={{ height:"100vh",background:"#060606",display:"flex",flexDirection:"column",fontFamily:"'Share Tech Mono',monospace",overflow:"hidden",position:"relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap');
        @keyframes ro-pulse{0%,100%{opacity:.4;}50%{opacity:1;}}
        @keyframes ro-ring{0%{transform:scale(1);opacity:.6;}100%{transform:scale(2.5);opacity:0;}}
        @keyframes ro-fadein{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
        @keyframes ro-think{0%,100%{opacity:.2;}50%{opacity:1;}}
        .ro-btn{transition:all .15s ease;cursor:pointer;border:none;}
        .ro-btn:hover{opacity:.8;}
        .ro-btn:active{transform:scale(.95);}
        textarea:focus{outline:none;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:#0a0a0a;}
        ::-webkit-scrollbar-thumb{background:#374151;border-radius:2px;}
      `}</style>
      <div style={{position:"absolute",inset:0,backgroundImage:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(255,255,255,.008) 3px,rgba(255,255,255,.008) 4px)",pointerEvents:"none",zIndex:0}}/>

      {/* HEADER */}
      <div style={{ background:"#0A0A0A",borderBottom:`1px solid ${accentBorder}`,padding:"10px 14px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0,position:"relative",zIndex:10 }}>
        <div style={{ display:"flex",alignItems:"center",gap:9 }}>
          <div style={{ width:8,height:8,borderRadius:"50%",background:accent,boxShadow:`0 0 10px ${accentGlow}`,animation:"ro-pulse 2s ease infinite" }}/>
          <span style={{ fontFamily:"'Orbitron',monospace",color:accent,fontSize:13,fontWeight:700,letterSpacing:".15em",textShadow:`0 0 12px ${accentGlow}` }}>ROAD ORACLE</span>
        </div>
        <div style={{ display:"flex",alignItems:"center",gap:7 }}>
          <span style={{ background:accentDim,border:`1px solid ${accentBorder}`,color:accent,fontSize:9,padding:"3px 8px",borderRadius:4,letterSpacing:".12em" }}>{mode === "driver" ? "DRIVER" : "MECHANIC"}</span>
          <button className="ro-btn" onClick={resetAll} style={{ background:"transparent",border:"1px solid #1F2937",color:"#4B5563",fontSize:9,padding:"3px 8px",borderRadius:4,letterSpacing:".1em",cursor:"pointer" }}>SWITCH MODE</button>
        </div>
      </div>

      {/* CAMERA FEED */}
      {showCam && (
        <div style={{ position:"relative",background:"#000",borderBottom:`1px solid ${accentBorder}`,flexShrink:0,height:160,overflow:"hidden" }}>
          <video ref={videoRef} autoPlay playsInline muted style={{ width:"100%",height:"100%",objectFit:"cover",opacity:.9 }}/>
          <div style={{ position:"absolute",inset:0,pointerEvents:"none" }}>
            <HUDCorners color={accent} />
            <div style={{ position:"absolute",top:8,left:"50%",transform:"translateX(-50%)",color:"#EF4444",fontSize:9,letterSpacing:".2em",display:"flex",alignItems:"center",gap:5 }}>
              <div style={{width:6,height:6,borderRadius:"50%",background:"#EF4444",animation:"ro-pulse 1s ease infinite"}}/>REC
            </div>
            <div style={{ position:"absolute",bottom:8,left:12,color:accent,fontSize:9,letterSpacing:".15em" }}>VISUAL SENSOR · ACTIVE</div>
          </div>
        </div>
      )}

      {/* ACOUSTIC VISUALIZER */}
      {listening && (
        <div style={{ background:"#0A0A0A",borderBottom:`1px solid ${accentBorder}`,padding:"10px 14px",flexShrink:0,position:"relative" }}>
          <div style={{ fontSize:9,color:accent,letterSpacing:".2em",marginBottom:7,display:"flex",alignItems:"center",gap:6 }}>
            <div style={{width:6,height:6,borderRadius:"50%",background:accent,animation:"ro-pulse 1s ease infinite"}}/>
            ACOUSTIC SENSOR · LIVE CAPTURE
          </div>
          <div style={{ display:"flex",alignItems:"flex-end",gap:1.5,height:36 }}>
            {audioData.map((v,i) => (
              <div key={i} style={{ flex:1,minWidth:2,height:Math.max(2,(v/255)*36),background:`linear-gradient(to top,${accent},${mode==="driver"?"#06B6D4":"#F59E0B"})`,borderRadius:1,transition:"height .05s ease",opacity:.85 }}/>
            ))}
          </div>
          <div style={{ position:"absolute",right:16,top:"50%",transform:"translateY(-50%)" }}>
            <div style={{width:28,height:28,position:"relative"}}>
              <div style={{position:"absolute",inset:0,borderRadius:"50%",border:`1px solid ${accent}`,animation:"ro-ring 1.5s ease-out infinite"}}/>
              <div style={{position:"absolute",inset:0,borderRadius:"50%",border:`1px solid ${accent}`,animation:"ro-ring 1.5s ease-out .5s infinite"}}/>
            </div>
          </div>
        </div>
      )}

      {/* CHAT */}
      <div style={{ flex:1,overflowY:"auto",padding:"14px",display:"flex",flexDirection:"column",gap:11,position:"relative",zIndex:1 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display:"flex",justifyContent:msg.role==="user"?"flex-end":"flex-start",animation:"ro-fadein .3s ease" }}>
            {msg.role === "assistant" && (
              <div style={{ width:28,height:28,borderRadius:"50%",background:accentDim,border:`1px solid ${accentBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,marginRight:8,flexShrink:0,marginTop:2 }}>🔮</div>
            )}
            <div style={{
              maxWidth:"78%",
              background: msg.role==="user" ? accentDim : "rgba(255,255,255,.025)",
              border: msg.role==="user" ? `1px solid ${accentBorder}` : "1px solid rgba(255,255,255,.06)",
              borderRadius: msg.role==="user" ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
              padding:"10px 14px",
              color: msg.role==="user" ? accent : "#D1D5DB",
              fontSize:13,lineHeight:1.75,whiteSpace:"pre-wrap",wordBreak:"break-word",
            }}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display:"flex",alignItems:"center",gap:8,animation:"ro-fadein .3s ease" }}>
            <div style={{ width:28,height:28,borderRadius:"50%",background:accentDim,border:`1px solid ${accentBorder}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13 }}>🔮</div>
            <div style={{ display:"flex",gap:5,padding:"11px 14px",background:"rgba(255,255,255,.025)",border:"1px solid rgba(255,255,255,.06)",borderRadius:"12px 12px 12px 3px" }}>
              {[0,1,2].map(j=>(
                <div key={j} style={{ width:7,height:7,borderRadius:"50%",background:accent,animation:`ro-think 1.1s ease ${j*.18}s infinite` }}/>
              ))}
            </div>
          </div>
        )}
        <div ref={chatEndRef}/>
      </div>

      {/* QUICK PROMPTS */}
      <div style={{ padding:"8px 14px 6px",display:"flex",gap:6,overflowX:"auto",flexShrink:0,background:"#0A0A0A",borderTop:"1px solid rgba(255,255,255,.04)" }}>
        {quickButtons.map(q => (
          <button key={q} className="ro-btn" onClick={() => sendToAI(q)} style={{ background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.07)",borderRadius:6,padding:"5px 10px",color:"#6B7280",fontSize:10,whiteSpace:"nowrap",letterSpacing:".04em",cursor:"pointer",flexShrink:0 }}>{q}</button>
        ))}
      </div>

      {/* SENSOR TOOLS */}
      <div style={{ padding:"8px 14px",display:"flex",gap:8,flexShrink:0,background:"#0A0A0A",borderTop:"1px solid rgba(255,255,255,.04)" }}>
        <button className="ro-btn" onClick={listening ? stopMic : startMic} style={{ background:listening?"rgba(239,68,68,.12)":accentDim,border:`1px solid ${listening?"rgba(239,68,68,.35)":accentBorder}`,borderRadius:8,padding:"9px 14px",color:listening?"#EF4444":accent,fontSize:11,display:"flex",alignItems:"center",gap:6,letterSpacing:".06em",cursor:"pointer",transition:"all .15s ease" }}>
          <span style={{fontSize:15}}>{listening?"⏹":"🎙️"}</span>
          {listening ? "STOP MIC" : "LISTEN"}
        </button>

        <button className="ro-btn" onClick={cameraOn ? stopCam : startCam} style={{ background:cameraOn?"rgba(239,68,68,.12)":accentDim,border:`1px solid ${cameraOn?"rgba(239,68,68,.35)":accentBorder}`,borderRadius:8,padding:"9px 14px",color:cameraOn?"#EF4444":accent,fontSize:11,display:"flex",alignItems:"center",gap:6,letterSpacing:".06em",cursor:"pointer",transition:"all .15s ease" }}>
          <span style={{fontSize:15}}>📷</span>
          {cameraOn ? "STOP CAM" : "CAMERA"}
        </button>

        <div style={{ marginLeft:"auto",display:"flex",alignItems:"center",gap:6 }}>
          <div style={{ width:7,height:7,borderRadius:"50%",background:"#10B981",boxShadow:"0 0 8px rgba(16,185,129,.5)",animation:"ro-pulse 2s ease infinite" }}/>
          <span style={{ color:"#374151",fontSize:9,letterSpacing:".1em" }}>ORACLE ACTIVE</span>
        </div>
      </div>

      {/* INPUT */}
      <div style={{ padding:"10px 14px 14px",borderTop:`1px solid ${accentBorder}`,background:"#080808",display:"flex",gap:8,alignItems:"flex-end",flexShrink:0,position:"relative",zIndex:10 }}>
        <textarea
          ref={textareaRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key==="Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
          placeholder={mode==="driver" ? "Describe what's wrong..." : "Symptoms, codes, observations..."}
          rows={2}
          style={{ flex:1,background:"rgba(255,255,255,.03)",border:"1px solid rgba(255,255,255,.08)",borderRadius:8,padding:"10px 12px",color:"#E5E7EB",fontSize:13,fontFamily:"'Share Tech Mono',monospace",lineHeight:1.6,resize:"none" }}
        />
        <button
          className="ro-btn"
          onClick={handleSend}
          disabled={loading || !input.trim()}
          style={{ background:input.trim()?`linear-gradient(135deg,${accent},${mode==="driver"?"#D97706":"#0891B2"})`:"#111827",border:"none",borderRadius:8,padding:"14px 16px",color:input.trim()?"#000":"#374151",fontSize:17,cursor:input.trim()?"pointer":"not-allowed",fontWeight:700,flexShrink:0,transition:"all .15s ease" }}
        >➤</button>
      </div>
    </div>
  );
}
