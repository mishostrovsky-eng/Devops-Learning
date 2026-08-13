function App() {
    const [hero, setHero] = React.useState('peter');
    const [heroHp, setHeroHp] = React.useState(100);
    const [villainHp, setVillainHp] = React.useState(100);
    const [webFluid, setWebFluid] = React.useState(100);
    const [villain, setVillain] = React.useState({ name: 'גרין גובלין', emoji: '🎃', maxHp: 100 });
    const [log, setLog] = React.useState('הקרב החל! בחר את הדמות שלך והילחם.');
    const [isShooting, setIsShooting] = React.useState(false);

    // State לשמירת הנתונים מה-Backend
    const [backendStatus, setBackendStatus] = React.useState('בודק חיבור לשרת...');

    // התחברות ל-Backend ברגע שהאפליקציה עולה
    React.useEffect(() => {
        fetch('http://localhost:3000/api/health')
            .then(response => response.json())
            .then(data => {
                console.log("Data from Backend:", data);
                setBackendStatus(`שרת פעיל: ${data.message}`);
            })
            .catch(error => {
                console.error("Error connecting to backend:", error);
                setBackendStatus('התחברות לשרת נכשלה ❌');
            });
    }, []);

    const heroesData = {
        peter: { name: 'פיטר פארקר', emoji: '🕷️' },
        miles: { name: 'מיילס מוראלס', emoji: '⚡' }
    };

    const villainsList = [
        { name: 'גרין גובלין', emoji: '🎃', maxHp: 100 },
        { name: 'דוקטור אוקטופוס', emoji: '🐙', maxHp: 120 },
        { name: 'ונום', emoji: '👽', maxHp: 150 }
    ];

    const triggerWebAnimation = (callback) => {
        setIsShooting(true);
        setTimeout(() => {
            setIsShooting(false);
            callback();
        }, 500);
    };

    const handleAttack = () => {
        if (webFluid < 15) {
            setLog('נגמר לך חומר הקורים! חייב לטעון מחדש.');
            return;
        }

        triggerWebAnimation(() => {
            const damage = hero === 'miles' ? 25 : 20;
            const newVillainHp = Math.max(0, villainHp - damage);
            setVillainHp(newVillainHp);
            setWebFluid(webFluid - 15);

            if (newVillainHp === 0) {
                setLog(`הבסת את ${villain.name}! כל הכבוד גיבור! 🏆`);
                setTimeout(() => nextVillain(), 1500);
            } else {
                setLog(`שלחת קורים ופגעת ב-${villain.name} (-${damage} נזק)! 💥`);
                villainCounterAttack();
            }
        });
    };

    const handleSpecial = () => {
        if (hero === 'peter' && webFluid < 40) {
            setLog('אין מספיק קורים למתקפה מיוחדת (דורש 40%)!');
            return;
        }

        triggerWebAnimation(() => {
            const specialDamage = 45;
            const newVillainHp = Math.max(0, villainHp - specialDamage);
            setVillainHp(newVillainHp);
            if (hero === 'peter') setWebFluid(webFluid - 40);

            setLog(`מתקפת קורים אדירה! גרמת ${specialDamage} נזק עצום! 🔥`);
            
            if (newVillainHp === 0) {
                setTimeout(() => nextVillain(), 1500);
            } else {
                villainCounterAttack();
            }
        });
    };

    const villainCounterAttack = () => {
        const vDamage = Math.floor(Math.random() * 12) + 8;
        const newHeroHp = Math.max(0, heroHp - vDamage);
        setHeroHp(newHeroHp);

        if (newHeroHp === 0) {
            setLog('הפסדת בקרב! מאפס את המערכת... 🔄');
            setTimeout(() => resetGame(), 2000);
        }
    };

    const handleReload = () => {
        setWebFluid(100);
        setLog('מלאי הקורים חודש בהצלחה! 🕸️');
    };

    const nextVillain = () => {
        const nextIndex = (villainsList.findIndex(v => v.name === villain.name) + 1) % villainsList.length;
        setVillain(villainsList[nextIndex]);
        setVillainHp(villainsList[nextIndex].maxHp);
        setHeroHp(100);
        setLog(`נבל חדש הופיע בזירה: ${villainsList[nextIndex].name}!`);
    };

    const resetGame = () => {
        setHeroHp(100);
        setVillainHp(100);
        setWebFluid(100);
        setVillain(villainsList[0]);
        setLog('המשחק אותחל מחדש.');
    };

    return (
        <div>
            {/* הודעת סטטוס השרת מחוץ לריבוע המשחק */}
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                <span style={{ background: '#222', color: '#48cae4', padding: '6px 14px', borderRadius: '5px', fontSize: '13px', display: 'inline-block' }}>
                    🟢 {backendStatus}
                </span>
            </div>

            <div className="spidey-card">
                <h1>מרכז קרבות ספיידר-מן 🕷️</h1>
                
                <div className="hero-select">
                    <button 
                        className={`hero-btn ${hero === 'peter' ? 'active' : ''}`}
                        onClick={() => { setHero('peter'); setLog('בחרת בפיטר פארקר!'); }}
                    >
                        🕷️ פיטר פארקר
                    </button>
                    <button 
                        className={`hero-btn ${hero === 'miles' ? 'active' : ''}`}
                        onClick={() => { setHero('miles'); setLog('בחרת במיילס מוראלס!'); }}
                    >
                        ⚡ מיילס מוראלס
                    </button>
                </div>

                <div className="visual-arena">
                    <div className="character-box">
                        <div className="char-avatar">{heroesData[hero].emoji}</div>
                        <div className="char-name">{heroesData[hero].name}</div>
                    </div>

                    {isShooting && <div className="web-projectile">🕸️</div>}

                    <div className="character-box">
                        <div className="char-avatar">{villain.emoji}</div>
                        <div className="char-name">{villain.name}</div>
                    </div>
                </div>

                <div className="stats-row">
                    <div style={{width: '45%'}}>
                        <span>בריאות גיבור ({heroHp}%)</span>
                        <div className="health-bar-container">
                            <div className="health-bar" style={{ width: `${heroHp}%`, background: '#2ea44f' }}></div>
                        </div>
                    </div>
                    <div style={{width: '45%'}}>
                        <span>קורים ({webFluid}%)</span>
                        <div className="health-bar-container">
                            <div className="health-bar" style={{ width: `${webFluid}%`, background: '#48cae4' }}></div>
                        </div>
                    </div>
                </div>

                <div style={{ marginBottom: '10px', fontSize: '13px' }}>
                    <span>בריאות הנבל ({villain.name}): {villainHp}/{villain.maxHp}</span>
                    <div className="health-bar-container">
                        <div className="health-bar" style={{ width: `${(villainHp / villain.maxHp) * 100}%`, background: '#d90429' }}></div>
                    </div>
                </div>

                <div className="actions-grid">
                    <button className="btn-action" onClick={handleAttack}>ירה קורים והלחם 👊</button>
                    <button className="btn-action btn-special" onClick={handleSpecial}>מתקפת רשת מיוחדת ⚡</button>
                    <button className="btn-action" onClick={handleReload} style={{ background: '#023e8a' }}>טעינת קורים 🔄</button>
                    <button className="btn-action" onClick={resetGame} style={{ background: '#555' }}>איפוס משחק ⚙️</button>
                </div>

                <div className="log-box">{log}</div>
            </div>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));