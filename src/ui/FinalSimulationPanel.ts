import { finalSimulationManager } from '../gameplay/FinalSimulationManager';

export class FinalSimulationPanel {
  public static render(container: HTMLElement, onComplete: () => void) {
    let modal = document.getElementById('final-sim-modal');
    if (modal) modal.remove();

    modal = document.createElement('div');
    modal.id = 'final-sim-modal';
    modal.style.cssText = `
      pointer-events: auto;
      background: #0d0f18;
      border: 4px solid #00f0ff;
      box-shadow: 0 10px 0 #000;
      padding: 24px;
      color: #f0f4fc;
      font-family: 'VT323', monospace;
      margin: auto;
      width: 90%;
      max-width: 700px;
      border-radius: 6px;
      text-align: center;
    `;

    modal.innerHTML = `
      <div style="font-family: 'Press Start 2P', monospace; font-size: 11px; color: #00f0ff; margin-bottom: 8px;">
        🏛️ CENTRAL SYSTEM • FINAL ACCESS CITY SIMULATION
      </div>
      <h2 style="font-family: 'Press Start 2P', monospace; font-size: 16px; color: #ffb703; margin-bottom: 16px;">
        SIMULATING 10,000 CITIZENS...
      </h2>
      <div style="background: #16192b; border: 2px solid #3b4269; padding: 16px; border-radius: 4px; margin-bottom: 20px;">
        <div id="sim-counter" style="font-family: 'Press Start 2P', monospace; font-size: 24px; color: #06d6a0;">0 / 10,000</div>
        <div style="font-size: 18px; color: #8b95c9; margin-top: 6px;">Citizens attempting digital service access...</div>
      </div>
      <button id="run-sim-btn" style="
        background: #ff007f;
        color: #fff;
        border: none;
        padding: 14px 28px;
        font-family: 'Press Start 2P', monospace;
        font-size: 12px;
        cursor: pointer;
        border-radius: 4px;
      ">RUN CITYWIDE SIMULATION ►</button>
      <div id="sim-results" style="display: none; margin-top: 20px;"></div>
    `;

    container.appendChild(modal);

    const runBtn = modal.querySelector('#run-sim-btn') as HTMLButtonElement;
    runBtn.addEventListener('click', () => {
      runBtn.disabled = true;
      runBtn.style.opacity = '0.5';

      const res = finalSimulationManager.runFinalSimulation();
      const counter = modal?.querySelector('#sim-counter') as HTMLDivElement;
      const resultsDiv = modal?.querySelector('#sim-results') as HTMLDivElement;

      // Animate counting up to 10,000
      let current = 0;
      const interval = setInterval(() => {
        current += 500;
        if (current >= res.citizensServed) {
          current = res.citizensServed;
          clearInterval(interval);
          
          if (counter) counter.innerText = `${current.toLocaleString()} / 10,000`;
          if (resultsDiv) {
            resultsDiv.style.display = 'block';
            resultsDiv.innerHTML = `
              <div style="font-family: 'Press Start 2P', monospace; font-size: 12px; color: #06d6a0; margin-bottom: 12px;">
                🎉 ACCESS CITY IS NOW OPEN TO EVERYONE!
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 20px; text-align: left; background: #16192b; padding: 14px; border-radius: 4px;">
                <div>ACCESSIBILITY: <span style="color:#06d6a0;">${res.accessibilityScore}%</span></div>
                <div>EFFICIENCY: <span style="color:#00f0ff;">${res.efficiencyScore}%</span></div>
                <div>USERS SERVED: <span style="color:#ffb703;">${res.citizensServed.toLocaleString()}</span></div>
                <div>DESIGN SCORE: <span style="color:#ff007f;">${res.designScore}%</span></div>
              </div>
              <div style="margin-top: 20px; font-family: 'Press Start 2P', monospace; font-size: 14px; color: #00f0ff;">
                WHAT IF THE INTERFACE WASN'T DESIGNED FOR YOU?
              </div>
              <div style="margin-top: 10px; font-family: 'Press Start 2P', monospace; font-size: 16px; color: #06d6a0;">
                WHAT IF IT WAS?
              </div>
              <button id="finish-sim-btn" style="
                margin-top: 20px;
                background: #06d6a0;
                color: #000;
                border: none;
                padding: 10px 20px;
                font-family: 'Press Start 2P', monospace;
                font-size: 10px;
                cursor: pointer;
              ">COMPLETE ACCESS CITY JOURNEY</button>
            `;

            document.getElementById('finish-sim-btn')?.addEventListener('click', () => {
              modal?.remove();
              onComplete();
            });
          }
        } else {
          if (counter) counter.innerText = `${current.toLocaleString()} / 10,000`;
        }
      }, 50);
    });
  }
}
