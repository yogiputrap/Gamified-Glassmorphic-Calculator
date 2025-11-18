const audioContext = typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)
  ? new (window.AudioContext || window.webkitAudioContext)()
  : null

function createBeep(frequency, duration, volume = 0.1) {
  if (!audioContext) return

  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)

  oscillator.frequency.value = frequency
  oscillator.type = 'sine'

  gainNode.gain.setValueAtTime(volume, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + duration)
}

export function playSound(type) {
  try {
    switch (type) {
      case 'click':
        createBeep(800, 0.05, 0.05)
        break
      case 'operation':
        createBeep(600, 0.08, 0.06)
        break
      case 'equals':
        createBeep(1000, 0.1, 0.08)
        setTimeout(() => createBeep(1200, 0.1, 0.08), 100)
        break
      case 'clear':
        createBeep(400, 0.1, 0.06)
        break
      case 'achievement':
        createBeep(523.25, 0.15, 0.1)
        setTimeout(() => createBeep(659.25, 0.15, 0.1), 150)
        setTimeout(() => createBeep(783.99, 0.15, 0.1), 300)
        setTimeout(() => createBeep(1046.50, 0.3, 0.1), 450)
        break
      default:
        createBeep(440, 0.05, 0.05)
    }
  } catch (error) {
    console.warn('Audio playback failed:', error)
  }
}
