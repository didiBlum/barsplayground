import React from "react";
import { useState } from "react";
import marshallImg from './assets/marshall.jpg';
import rockyImg from './assets/rocky.jpg';
import zumaImg from './assets/zuma.jpg';
import chaseImg from './assets/chase.webp';
import rubbleImg from './assets/rubble.webp';
import skyeImg from './assets/skye.jpg';
import ryderImg from './assets/ryder.png';

const pups = {
  marshall: { name: "מרשל", role: "כבאי", color: "#e53e3e", img: marshallImg },
  rocky: { name: "רוקי", role: "מתקן", color: "#38a169", img: rockyImg },
  zuma: { name: "זומה", role: "הצלה ימית", color: "#dd6b20", img: zumaImg },
  chase: { name: "צ'ייס", role: "שוטר", color: "#3182ce", img: chaseImg },
  rubble: { name: "ראבל", role: "חפירה", color: "#d69e2e", img: rubbleImg },
  skye: { name: "סקיי", role: "טייסת", color: "#ed64a6", img: skyeImg },
};

const missions = {
  forest_fire: {
    title: "שריפה ביער",
    steps: [
      { description: "מצאו את מוקד השריפה.", type: "find_fire" },
      { description: "כיבו את האש.", type: "put_out_fire" },
      { description: "הצילו את החיות מהיער.", type: "rescue_animals" },
    ]
  },
  wally_trapped: {
    title: "וולי נתקע ברשת",
    steps: [
      { description: "מצאו את וולי.", type: "find_wally" },
      { description: "חתכו את הרשת.", type: "cut_net" },
      { description: "הביאו את וולי למקום בטוח.", type: "bring_wally" },
    ]
  },
  flooding_city: {
    title: "סערה והצפה בעיר",
    steps: [
      { description: "חסמו את המים.", type: "block_water" },
      { description: "חפרו תעלת ניקוז.", type: "dig_drainage" },
      { description: "עזרו לתושבים.", type: "help_citizens" },
    ]
  },
  amendinger_attack: {
    title: "אמדינגר הרס את העיר",
    steps: [
      { description: "תפסו את אמדינגר.", type: "catch_amendinger" },
      { description: "נקו את העיר.", type: "clean_city" },
      { description: "תקנו את הבניינים.", type: "repair_buildings" },
    ]
  },
  cat_tree: {
    title: "חתול תקוע על עץ",
    steps: [
      { description: "מצאו את החתול.", type: "find_cat" },
      { description: "טפסו על העץ.", type: "climb_tree" },
      { description: "הורידו את החתול.", type: "bring_cat_down" },
    ]
  },
  lost_chickaletta: {
    title: "צ'יקלטה אבדה",
    steps: [
      { description: "חפשו את צ'יקלטה בחווה.", type: "search_farm" },
      { description: "חפשו את צ'יקלטה בפארק.", type: "search_park" },
      { description: "החזירו את צ'יקלטה הביתה.", type: "bring_chickaletta" },
    ]
  },
  broken_bridge: {
    title: "גשר שבור",
    steps: [
      { description: "פנו את ההריסות.", type: "clear_debris" },
      { description: "תקנו את הגשר.", type: "fix_bridge" },
      { description: "בדקו את הגשר.", type: "test_bridge" },
    ]
  },
  runaway_train: {
    title: "רכבת משתוללת",
    steps: [
      { description: "הרכבת יצאה משליטה! עצרו את הרכבת.", type: "stop_train" },
      { description: "פנו את הנוסעים לבית החולים.", type: "rescue_passengers" },
      { description: "בנו מחדש את הרכבת.", type: "rebuild_train" },
    ]
  },
};

const steps = [
  "select_mission",
  "story",
  "mission_step",
  "success",
];

const pawBg = {
  background: `repeating-linear-gradient(135deg, #f7fafc 0 40px, #e3f0ff 40px 80px), url('https://emojiapi.dev/api/v1/1f43e/64.png') repeat`,
  backgroundSize: 'auto, 80px 80px',
  minHeight: '100vh',
};

export default function App() {
  const [currentStep, setCurrentStep] = useState("select_mission");
  const [selectedMissionKey, setSelectedMissionKey] = useState(null);
  const [missionStepIndex, setMissionStepIndex] = useState(0);
  const [selectedPupsPerStep, setSelectedPupsPerStep] = useState([]); // array of arrays
  const [currentSelectedPups, setCurrentSelectedPups] = useState([]); // for current step
  const [taskState, setTaskState] = useState({});
  const [stepPhase, setStepPhase] = useState('select_pups'); // 'select_pups' or 'do_task'

  const mission = missions[selectedMissionKey];
  const missionSteps = mission?.steps || [];
  const currentMissionStep = missionSteps[missionStepIndex];

  function resetGame() {
    setSelectedMissionKey(null);
    setCurrentStep("select_mission");
    setMissionStepIndex(0);
    setSelectedPupsPerStep([]);
    setCurrentSelectedPups([]);
    setTaskState({});
    setStepPhase('select_pups');
  }

  function nextStep() {
    if (currentStep === "story") {
      setCurrentStep("mission_step");
      setCurrentSelectedPups([]);
      setTaskState({});
      setStepPhase('select_pups');
    } else if (currentStep === "mission_step") {
      if (stepPhase === 'select_pups') {
        setStepPhase('do_task');
        // Save selected pups for this step
        setSelectedPupsPerStep(prev => {
          const updated = [...prev];
          updated[missionStepIndex] = currentSelectedPups;
          return updated;
        });
      } else if (stepPhase === 'do_task') {
        // If task is done, go to next mission step or finish
        if (missionStepIndex < missionSteps.length - 1) {
          setMissionStepIndex(missionStepIndex + 1);
          setCurrentSelectedPups([]);
          setTaskState({});
          setStepPhase('select_pups');
        } else {
          setCurrentStep("success");
        }
      }
    }
  }

  // Task state setup for each step
  React.useEffect(() => {
    if (currentStep === "mission_step" && stepPhase === 'do_task') {
      if (["find_fire", "find_wally", "find_cat", "search_farm", "search_park"].includes(currentMissionStep.type)) {
        setTaskState({ findsLeft: 3 });
      } else if (["put_out_fire"].includes(currentMissionStep.type)) {
        setTaskState({ firesLeft: 3 });
      } else if (["cut_net"].includes(currentMissionStep.type)) {
        setTaskState({ cutsLeft: 3 });
      } else if (["rescue_animals", "help_citizens", "bring_wally", "bring_cat_down", "bring_chickaletta", "rescue_passengers"].includes(currentMissionStep.type)) {
        setTaskState({ rescuesLeft: 3 });
      } else if (["dig_drainage"].includes(currentMissionStep.type)) {
        setTaskState({ digsLeft: 3 });
      } else if (["fix_bridge", "rebuild_train", "repair_buildings"].includes(currentMissionStep.type)) {
        setTaskState({ repairsLeft: 3 });
      } else if (["clean_city"].includes(currentMissionStep.type)) {
        setTaskState({ cleansLeft: 3 });
      } else if (["catch_amendinger"].includes(currentMissionStep.type)) {
        setTaskState({ catchesLeft: 3 });
      } else if (["climb_tree"].includes(currentMissionStep.type)) {
        setTaskState({ climbsLeft: 3 });
      } else if (["clear_debris"].includes(currentMissionStep.type)) {
        setTaskState({ clearsLeft: 3 });
      } else if (["stop_train"].includes(currentMissionStep.type)) {
        setTaskState({ brakesLeft: 2 });
      } else if (["rescue_passengers"].includes(currentMissionStep.type)) {
        setTaskState({ rescuesLeft: 3 });
      }
    }
  }, [currentStep, missionStepIndex, selectedMissionKey, stepPhase]);

  function handleTaskClick() {
    if (["find_fire", "find_wally", "find_cat", "search_farm", "search_park"].includes(currentMissionStep.type) && taskState.findsLeft > 0) {
      setTaskState(s => ({ ...s, findsLeft: s.findsLeft - 1 }));
    } else if (["put_out_fire"].includes(currentMissionStep.type) && taskState.firesLeft > 0) {
      setTaskState(s => ({ ...s, firesLeft: s.firesLeft - 1 }));
    } else if (["cut_net"].includes(currentMissionStep.type) && taskState.cutsLeft > 0) {
      setTaskState(s => ({ ...s, cutsLeft: s.cutsLeft - 1 }));
    } else if (["rescue_animals", "help_citizens", "bring_wally", "bring_cat_down", "bring_chickaletta", "rescue_passengers"].includes(currentMissionStep.type) && taskState.rescuesLeft > 0) {
      setTaskState(s => ({ ...s, rescuesLeft: s.rescuesLeft - 1 }));
    } else if (["dig_drainage"].includes(currentMissionStep.type) && taskState.digsLeft > 0) {
      setTaskState(s => ({ ...s, digsLeft: s.digsLeft - 1 }));
    } else if (["fix_bridge", "rebuild_train", "repair_buildings"].includes(currentMissionStep.type) && taskState.repairsLeft > 0) {
      setTaskState(s => ({ ...s, repairsLeft: s.repairsLeft - 1 }));
    } else if (["clean_city"].includes(currentMissionStep.type) && taskState.cleansLeft > 0) {
      setTaskState(s => ({ ...s, cleansLeft: s.cleansLeft - 1 }));
    } else if (["catch_amendinger"].includes(currentMissionStep.type) && taskState.catchesLeft > 0) {
      setTaskState(s => ({ ...s, catchesLeft: s.catchesLeft - 1 }));
    } else if (["climb_tree"].includes(currentMissionStep.type) && taskState.climbsLeft > 0) {
      setTaskState(s => ({ ...s, climbsLeft: s.climbsLeft - 1 }));
    } else if (["clear_debris"].includes(currentMissionStep.type) && taskState.clearsLeft > 0) {
      setTaskState(s => ({ ...s, clearsLeft: s.clearsLeft - 1 }));
    } else if (["stop_train"].includes(currentMissionStep.type) && taskState.brakesLeft > 0) {
      setTaskState(s => ({ ...s, brakesLeft: s.brakesLeft - 1 }));
    }
  }

  function isMissionStepDone() {
    if (["find_fire", "find_wally", "find_cat", "search_farm", "search_park"].includes(currentMissionStep.type)) return taskState.findsLeft === 0;
    if (["put_out_fire"].includes(currentMissionStep.type)) return taskState.firesLeft === 0;
    if (["cut_net"].includes(currentMissionStep.type)) return taskState.cutsLeft === 0;
    if (["rescue_animals", "help_citizens", "bring_wally", "bring_cat_down", "bring_chickaletta", "rescue_passengers"].includes(currentMissionStep.type)) return taskState.rescuesLeft === 0;
    if (["dig_drainage"].includes(currentMissionStep.type)) return taskState.digsLeft === 0;
    if (["fix_bridge", "rebuild_train", "repair_buildings"].includes(currentMissionStep.type)) return taskState.repairsLeft === 0;
    if (["clean_city"].includes(currentMissionStep.type)) return taskState.cleansLeft === 0;
    if (["catch_amendinger"].includes(currentMissionStep.type)) return taskState.catchesLeft === 0;
    if (["climb_tree"].includes(currentMissionStep.type)) return taskState.climbsLeft === 0;
    if (["clear_debris"].includes(currentMissionStep.type)) return taskState.clearsLeft === 0;
    if (["stop_train"].includes(currentMissionStep.type)) return taskState.brakesLeft === 0;
    // For steps with no task, always return true
    return true;
  }

  function renderPupSelection() {
    return Object.entries(pups).map(([id, pup]) => {
      const isSelected = currentSelectedPups.includes(id);
      return (
        <div
          key={id}
          onClick={() => {
            if (isSelected) {
              setCurrentSelectedPups(currentSelectedPups.filter(p => p !== id));
            } else {
              setCurrentSelectedPups([...currentSelectedPups, id]);
            }
          }}
          style={{
            backgroundColor: isSelected ? pup.color : "#f0f0f0",
            borderRadius: 12,
            padding: 10,
            color: isSelected ? "white" : "#333",
            margin: 5,
            minWidth: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            border: isSelected ? "3px solid #333" : "1px solid #ddd",
            transition: "all 0.2s",
          }}
        >
          <img src={pup.img} alt={pup.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", marginBottom: 6, border: "2px solid #fff" }} />
          <strong>{pup.name}</strong>
          <br />
          <small>{pup.role}</small>
        </div>
      );
    });
  }

  function renderCalledPups() {
    return currentSelectedPups.map((id) => {
      const pup = pups[id];
      return (
        <div
          key={id}
          style={{
            backgroundColor: pup.color,
            borderRadius: 12,
            padding: 10,
            color: "white",
            margin: 5,
            minWidth: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img src={pup.img} alt={pup.name} style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover", marginBottom: 6, border: "2px solid #fff" }} />
          <strong>{pup.name}</strong>
          <br />
          <small>{pup.role}</small>
        </div>
      );
    });
  }

  // UI Render
  if (currentStep === "select_mission") {
    return (
      <div style={pawBg}>
        <div style={{
          maxWidth: 400,
          width: "100%",
          padding: 24,
          textAlign: "center",
          background: "linear-gradient(135deg, #fff 60%, #e3f0ff 100%)",
          borderRadius: 32,
          boxShadow: "0 8px 32px #0002",
          margin: '40px auto',
          animation: 'bounceIn 1s',
          position: 'relative',
        }}>
          <img src={ryderImg} alt="ריידר" style={{ width: 120, margin: '0 auto 12px', display: 'block', filter: 'drop-shadow(0 4px 12px #1976d2aa)' }} />
          <h1 style={{ fontSize: 32, marginBottom: 20, fontWeight: 900, color: '#1976d2', letterSpacing: 1 }}>🐾 בחר משימה</h1>
          {Object.entries(missions).map(([key, m]) => (
            <button
              key={key}
              onClick={() => {
                setSelectedMissionKey(key);
                setCurrentStep("story");
                setMissionStepIndex(0);
                setSelectedPupsPerStep([]);
                setCurrentSelectedPups([]);
                setStepPhase('select_pups');
              }}
              style={{
                display: "block",
                width: "100%",
                marginBottom: 14,
                padding: 14,
                fontSize: 20,
                cursor: "pointer",
                borderRadius: 18,
                background: "linear-gradient(90deg, #f6e05e 60%, #ffd700 100%)",
                border: "none",
                fontWeight: 700,
                boxShadow: "0 2px 8px #ffd70044",
                transition: "transform 0.15s, box-shadow 0.15s",
                outline: 'none',
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.06)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              {m.title}
            </button>
          ))}
        </div>
        <style>{`
          @keyframes bounceIn {
            0% { transform: scale(0.8); opacity: 0; }
            60% { transform: scale(1.05); opacity: 1; }
            100% { transform: scale(1); }
          }
        `}</style>
      </div>
    );
  }

  if (!mission) return null;

  return (
    <div style={pawBg}>
      <div style={{
        maxWidth: 400,
        width: "100%",
        padding: 24,
        textAlign: "center",
        background: "linear-gradient(135deg, #fff 60%, #e3f0ff 100%)",
        borderRadius: 32,
        boxShadow: "0 8px 32px #0002",
        margin: '40px auto',
        animation: 'bounceIn 1s',
        position: 'relative',
      }}>
        <h2 style={{ fontSize: 24, marginBottom: 8 }}>{mission.title}</h2>

        {currentStep === "story" && (
          <>
            <p>{missionSteps[0].description}</p>
            <button onClick={nextStep} style={btnStyle}>
              המשך
            </button>
          </>
        )}

        {currentStep === "mission_step" && (
          <>
            <h3 style={{ fontSize: 20, margin: "16px 0 8px" }}>שלב {missionStepIndex + 1} מתוך {missionSteps.length}</h3>
            <p>{currentMissionStep.description}</p>
            {stepPhase === 'select_pups' && (
              <>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}>
                  {renderPupSelection()}
                </div>
                {currentSelectedPups.length > 0 && (
                  <button onClick={nextStep} style={btnStyle}>
                    קדימה!
                  </button>
                )}
                {currentSelectedPups.length === 0 && (
                  <p style={{ color: "#666", fontSize: 14 }}>בחרו לפחות גור אחד</p>
                )}
              </>
            )}
            {stepPhase === 'do_task' && (
              <>
                <p>ריידר מזעיק את הגורים הבאים:</p>
                <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", marginBottom: 12 }}>
                  {renderCalledPups()}
                </div>
                {/* Task UI for this step */}
                {currentMissionStep.type === "stop_train" && (
                  <div>
                    <p>🚂 עצרו את הרכבת! נשארו {taskState.brakesLeft} בלימות</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.brakesLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#3182ce",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🚨
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "rescue_passengers" && (
                  <div>
                    <p>🚑 פנו את הנוסעים! נשארו {taskState.rescuesLeft} פצועים</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.rescuesLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#ed64a6",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🚑
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "rebuild_train" && (
                  <div>
                    <p>🔧 בנו מחדש את הרכבת! נשארו {taskState.repairsLeft} תיקונים</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.repairsLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#38a169",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🔧
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "put_out_fire" && (
                  <div>
                    <p>🔥 כבו את האש! נשארו {taskState.firesLeft} מוקדי אש</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.firesLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#e53e3e",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🔥
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "cut_net" && (
                  <div>
                    <p>✂️ חתכו את הרשת! נשארו {taskState.cutsLeft} חתיכות</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.cutsLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#3182ce",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          ✂️
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "dig_drainage" && (
                  <div>
                    <p>🪣 חפרו תעלה! נשארו {taskState.digsLeft} חפירות</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.digsLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#d69e2e",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🪣
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "fix_bridge" && (
                  <div>
                    <p>🌉 תקנו את הגשר! נשארו {taskState.repairsLeft} תיקונים</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.repairsLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#38a169",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🔨
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "find_fire" && (
                  <div>
                    <p>🔍 מצאו את מוקד השריפה! נשארו {taskState.findsLeft} חיפושים</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.findsLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#f6ad55",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🔍
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "find_wally" && (
                  <div>
                    <p>🔍 מצאו את וולי! נשארו {taskState.findsLeft} חיפושים</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.findsLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#3182ce",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🔍
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "find_cat" && (
                  <div>
                    <p>🔍 מצאו את החתול! נשארו {taskState.findsLeft} חיפושים</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.findsLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#ed64a6",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🔍
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "search_farm" && (
                  <div>
                    <p>🔍 חפשו את צ'יקלטה בחווה! נשארו {taskState.findsLeft} חיפושים</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.findsLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#d69e2e",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🔍
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "search_park" && (
                  <div>
                    <p>🔍 חפשו את צ'יקלטה בפארק! נשארו {taskState.findsLeft} חיפושים</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.findsLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#38a169",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🔍
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "rescue_animals" && (
                  <div>
                    <p>🐾 הצילו את החיות! נשארו {taskState.rescuesLeft} חיות</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.rescuesLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#38a169",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🐾
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "bring_wally" && (
                  <div>
                    <p>🐋 הביאו את וולי למקום בטוח! נשארו {taskState.rescuesLeft} לחיצות</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.rescuesLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#3182ce",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🐋
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "help_citizens" && (
                  <div>
                    <p>🧑‍🤝‍🧑 עזרו לתושבים! נשארו {taskState.rescuesLeft} תושבים</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.rescuesLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#ed64a6",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🧑‍🤝‍🧑
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "bring_cat_down" && (
                  <div>
                    <p>🐱 הורידו את החתול! נשארו {taskState.rescuesLeft} לחיצות</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.rescuesLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#ed64a6",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🐱
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "bring_chickaletta" && (
                  <div>
                    <p>🐔 החזירו את צ'יקלטה! נשארו {taskState.rescuesLeft} לחיצות</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.rescuesLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#d69e2e",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🐔
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "clean_city" && (
                  <div>
                    <p>🧹 נקו את העיר! נשארו {taskState.cleansLeft} ניקיונות</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.cleansLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#805ad5",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🧹
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "catch_amendinger" && (
                  <div>
                    <p>😼 תפסו את אמדינגר! נשארו {taskState.catchesLeft} לחיצות</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.catchesLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#805ad5",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          😼
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "climb_tree" && (
                  <div>
                    <p>🌳 טפסו על העץ! נשארו {taskState.climbsLeft} טיפוסים</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.climbsLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#ed64a6",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🌳
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {currentMissionStep.type === "clear_debris" && (
                  <div>
                    <p>🧱 פנו את ההריסות! נשארו {taskState.clearsLeft} לחיצות</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 10 }}>
                      {[...Array(taskState.clearsLeft || 0)].map((_, i) => (
                        <button
                          key={i}
                          onClick={handleTaskClick}
                          style={{
                            backgroundColor: "#d69e2e",
                            borderRadius: "50%",
                            width: 50,
                            height: 50,
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 20,
                            cursor: "pointer",
                          }}
                        >
                          🧱
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {/* For steps with no special task, just show a 'סיימתי!' button */}
                {(!["stop_train","rescue_passengers","rebuild_train","put_out_fire","cut_net","dig_drainage","fix_bridge"].includes(currentMissionStep.type) || isMissionStepDone()) && (
                  <button onClick={nextStep} style={btnStyle}>
                    {missionStepIndex < missionSteps.length - 1 ? "לשלב הבא" : "סיימתי!"}
                  </button>
                )}
              </>
            )}
          </>
        )}

        {currentStep === "success" && (
          <>
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
              <ConfettiEffect />
            </div>
            <h3>🎉 כל הכבוד! סיימתם את המשימה.</h3>
            <div style={{ margin: '16px 0', fontSize: 22 }}>
              חטיף לכל הגורים!
              <div style={{ marginTop: 8 }}>
                {Array.from(new Set(selectedPupsPerStep.flat())).map((id) => (
                  <span key={id} title={pups[id]?.name} style={{ margin: '0 6px' }}>🦴</span>
                ))}
              </div>
            </div>
            <button onClick={resetGame} style={btnStyle}>
              חזור למסך הראשי
            </button>
          </>
        )}
      </div>
      <style>{`
        @keyframes bounceIn {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(1); }
        }
        button:hover {
          filter: brightness(1.1) drop-shadow(0 2px 8px #ffd70088);
        }
      `}</style>
    </div>
  );
}

const btnStyle = {
  marginTop: 20,
  padding: "10px 20px",
  fontSize: 16,
  cursor: "pointer",
  borderRadius: 6,
  backgroundColor: "#3182ce",
  color: "white",
  border: "none",
};

function ConfettiEffect() {
  // Simple confetti using emoji
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 2 }}>
      {[...Array(30)].map((_, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: `${18 + Math.random() * 24}px`,
            animation: `confetti-fall 2.5s ${Math.random()}s ease-in`,
            userSelect: 'none',
          }}
        >
          {['🎉','✨','🦴','🐾','⭐️','💙','💛'][Math.floor(Math.random()*7)]}
        </span>
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-60px) rotate(-10deg); opacity: 0; }
          20% { opacity: 1; }
          100% { transform: translateY(400px) rotate(20deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
