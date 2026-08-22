import { investigationManager } from '../gameplay/InvestigationManager';
import { transformationManager } from '../gameplay/TransformationManager';

export class InvestigationPanel {
  public static render(container: HTMLElement, challengeId: string, onComplete: () => void) {
    const inv = investigationManager.getInvestigation(challengeId);
    if (!inv) {
      onComplete();
      return;
    }

    let modal = document.getElementById('investigation-modal');
    if (modal) modal.remove();

    modal = document.createElement('div');
    modal.id = 'investigation-modal';
    modal.style.cssText = `
      pointer-events: auto;
      background: #16192b;
      border: 4px solid #ff007f;
      box-shadow: 0 8px 0 #000;
      padding: 20px;
      color: #f0f4fc;
      font-family: 'VT323', monospace;
      margin: auto;
      width: 90%;
      max-width: 650px;
      border-radius: 6px;
    `;

    const causesHTML = inv.causes
      .map(
        (c) => `
        <button class="cause-opt-btn" data-id="${c.id}" style="
          display: block;
          width: 100%;
          text-align: left;
          background: #2a2f4c;
          border: 2px solid #485282;
          color: #f0f4fc;
          padding: 10px;
          margin-top: 8px;
          font-family: 'VT323', monospace;
          font-size: 20px;
          cursor: pointer;
          border-radius: 4px;
        ">
          <strong>${c.label}</strong>
          <div style="font-size: 16px; color: #8b95c9;">${c.description}</div>
        </button>
      `
      )
      .join('');

    modal.innerHTML = `
      <div style="font-family: 'Press Start 2P', monospace; font-size: 10px; color: #ff007f; margin-bottom: 6px;">
        🔍 ACCESSIBILITY INVESTIGATION REPLAY • ${inv.userProfile.toUpperCase()}
      </div>
      <h3 style="font-family: 'Press Start 2P', monospace; font-size: 13px; color: #ffb703; margin-bottom: 12px;">BARRIER DETECTED</h3>
      <p style="font-size: 22px; color: #ff007f; margin-bottom: 14px;">"${inv.detectedIssue}"</p>
      <p style="font-size: 20px; margin-bottom: 10px;">Select the root design cause to apply a fix:</p>
      <div>${causesHTML}</div>
      <div id="inv-feedback" style="margin-top: 14px; display: none;"></div>
    `;

    container.appendChild(modal);

    modal.querySelectorAll('.cause-opt-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const causeId = (e.currentTarget as HTMLButtonElement).getAttribute('data-id');
        if (!causeId) return;

        const res = investigationManager.submitDiagnosis(challengeId, causeId);
        const feedbackDiv = modal?.querySelector('#inv-feedback') as HTMLDivElement;

        if (feedbackDiv) {
          feedbackDiv.style.display = 'block';
          feedbackDiv.style.padding = '12px';
          feedbackDiv.style.borderRadius = '4px';
          feedbackDiv.style.border = res.isCorrect ? '2px solid #06d6a0' : '2px solid #ff007f';
          feedbackDiv.style.background = res.isCorrect ? '#06392c' : '#4a0024';

          feedbackDiv.innerHTML = `
            <div style="font-family: 'Press Start 2P', monospace; font-size: 11px; color: ${res.isCorrect ? '#06d6a0' : '#ff007f'};">
              ${res.isCorrect ? '✓ CAUSE IDENTIFIED & FIX APPLIED' : '✗ DIAGNOSIS INCOMPLETE'}
            </div>
            <div style="font-size: 20px; margin-top: 6px;">${res.retestMessage}</div>
            <button id="close-inv-btn" style="
              margin-top: 12px;
              background: #00f0ff;
              color: #000;
              border: none;
              padding: 8px 16px;
              font-family: 'Press Start 2P', monospace;
              font-size: 10px;
              cursor: pointer;
            ">RETEST USER INTERACTION ►</button>
          `;

          if (res.isCorrect) {
            transformationManager.applyTransformation({ type: 'fix-applied', cssChanges: { border: '2px solid #06d6a0' } });
          }

          document.getElementById('close-inv-btn')?.addEventListener('click', () => {
            modal?.remove();
            onComplete();
          });
        }
      });
    });
  }
}
