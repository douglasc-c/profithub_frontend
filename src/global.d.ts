declare namespace JSX {
  interface IntrinsicElements {
    'gecko-coin-converter-widget': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      locale?: string
      dark_mode?: string
      outlined?: string
      initial_currency?: string
    }
    'cs-widget': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    > & {
      type?: string
      theme?: string
      direction?: string
      background?: string
      'is-market-sentiment-visible'?: string
      'is-last-updated-visible'?: string
      'title-color'?: string
      'chart-indicator-one-color'?: string
      'chart-indicator-two-color'?: string
      'chart-indicator-three-color'?: string
      'chart-indicator-four-color'?: string
      'subtitle-color'?: string
      'last-updated-color'?: string
      'arrow-color'?: string
    }
  }
}
