// Cloudflare Turnstile utilities

export const TURNSTILE_SITEKEY = import.meta.env.VITE_TURNSTILE_SITEKEY || 'your-turnstile-sitekey'
export const TURNSTILE_VERIFY_URL = import.meta.env.VITE_TURNSTILE_VERIFY_URL || 'https://cf-turnstile-verify.rndas.workers.dev'

/**
 * Render Turnstile widget
 * @param {HTMLElement} element - The element to render the widget in
 * @param {Function} callback - Callback function when verification is complete
 * @param {string} theme - Theme for the widget ('light' or 'dark')
 * @returns {string} Widget ID
 */
export const renderTurnstile = (element, callback, theme = 'light') => {
  if (!window.turnstile) {
    console.error('Turnstile script not loaded')
    return null
  }

  if (!element) {
    console.error('Element not provided for Turnstile widget')
    return null
  }

  // Clear any existing content
  element.innerHTML = ''

  try {
    return window.turnstile.render(element, {
      sitekey: TURNSTILE_SITEKEY,
      callback,
      theme,
      'error-callback': (error) => {
        console.error('Turnstile error:', error)
      },
      'expired-callback': () => {
        console.warn('Turnstile token expired')
        callback(null) // Reset token
      }
    })
  } catch (error) {
    console.error('Failed to render Turnstile widget:', error)
    return null
  }
}

/**
 * Reset Turnstile widget
 * @param {string} widgetId - The widget ID to reset
 */
export const resetTurnstile = (widgetId) => {
  if (window.turnstile && widgetId) {
    try {
      window.turnstile.reset(widgetId)
    } catch (error) {
      console.warn('Failed to reset Turnstile widget:', error)
    }
  }
}

/**
 * Remove Turnstile widget
 * @param {string} widgetId - The widget ID to remove
 */
export const removeTurnstile = (widgetId) => {
  if (window.turnstile && widgetId) {
    try {
      window.turnstile.remove(widgetId)
    } catch (error) {
      console.warn('Failed to remove Turnstile widget:', error)
    }
  }
}

/**
 * Verify Turnstile token with backend
 * @param {string} token - The Turnstile token
 * @returns {Promise<boolean>} Verification result
 */
export const verifyTurnstileToken = async (token) => {
  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'cf-turnstile-response': token
      })
    })

    const data = await response.json()
    return data.success === true
  } catch (error) {
    console.error('Failed to verify Turnstile token:', error)
    return false
  }
}