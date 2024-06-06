document.addEventListener('DOMContentLoaded', () => {
  const switchButton = document.getElementById('switch');
  const refreshButton = document.getElementById('refresh');

  function updateSwitchState(isDisabled) {
    if (isDisabled) {
      switchButton.classList.remove('on');
      switchButton.setAttribute('aria-label', 'Click to re-enable extension.');
      switchButton.setAttribute('title', 'Click to re-enable extension.');
    } else {
      switchButton.classList.add('on');
      switchButton.setAttribute('aria-label', 'Extension is on. Click to turn off.');
      switchButton.setAttribute('title', 'Extension is on. Click to turn off.');
    }
  }

  chrome.storage.local.get(['isDisabled'], (result) => {
    updateSwitchState(result.isDisabled);
  });

  switchButton.addEventListener('click', () => {
    chrome.storage.local.get(['isDisabled'], (result) => {
      const isDisabled = !result.isDisabled;
      chrome.storage.local.set({ isDisabled: isDisabled }, () => {
        updateSwitchState(isDisabled);
      });
    });
  });

  refreshButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.reload(tabs[0].id);
    });
  });
});
