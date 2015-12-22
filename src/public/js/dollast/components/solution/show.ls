require! {
  \react : {create-class}
  \react-redux : {connect}
  \../elements : {icon-text}
  \../../actions : {on-get-solution}
  \../utils : U
  \immutable : I
  \react-highlight : highlight
}

log = debug \dollast:component:solution:show

selector = (state) ->
  sol: state.get-in [\solution, \show], I.from-JS do
    final: {}
    results: []

module.exports = (connect selector) create-class do
  display-name: \sol-show

  component-will-mount: ->
    @props.dispatch on-get-solution @props.params.sid

  render: ->
    sol = @props.sol.to-JS!

    _ \div, null,
      _ \h3, class-name: "ui header", "author: #{sol.user}"
      _ \h3, class-name: "ui header", "lang: #{sol.lang}"
      _ \h3, class-name: "ui header", "problem:",
        _ \span, null, sol.prob
      switch sol.final.status
        | \private =>
          _ \p, null, "this code is private"
        | \CE =>
          _ \div, null,
            _ \p, null, "compile message:"
            _ \pre, null, sol.final.message
        | \running =>
          _ \div, class-name: \ui, \running
        | otherwise =>
          _ \div, null,
            _ \div, class-name: "ui toggle checkbox",
              _ \input, type: \checkbox
              _ \label, "Current state: #{if open then \public else \private}"
            _ \div, class-name: \ui,
              _ \h1, class-name: "ui header dividing", \details
              _ \table, class-name: "ui table segment",
                _ \thead, null,
                  _ \tr, null,
                    _ \th, null, \input
                    _ \th, null, \status
                    _ \th, null, \time
                    _ \th, null, \space
                    _ \th, null, \score
                    _ \th, null, \message
                _ \tbody, null,
                  for result in sol.results
                    _ \tr, class-name: \positive, key: result.input,
                      _ \td, null, result.input
                      _ \td, null, result.status
                      _ \td, null, result.time
                      _ \td, null, result.space
                      _ \td, null, result.score
                      _ \td, null, result.message
                _ \tfoot, null,
                  _ \tr, null,
                    _ \th, null, 'final result'
                    _ \th, null, sol.final.status
                    _ \th, null, sol.final.time
                    _ \th, null, sol.final.space
                    _ \th, null, sol.final.score
                    _ \th, null, sol.final.message
      _ \h1, class-name: "ui header dividing", \code
      _ \pre, null,
        _ highlight, class-name: sol.lang, sol.code