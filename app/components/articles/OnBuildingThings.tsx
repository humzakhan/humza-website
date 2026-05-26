export function OnBuildingThings() {
  return (
    <>
      <p>
        I've been building software for over a decade. In that time I've shipped
        products used by millions, joined a Y Combinator company as an early
        engineer, started my own venture, and consulted for teams trying to move
        faster than their headcount allows. The through-line across all of it is
        a simple obsession: what does it actually take to build something that
        matters?
      </p>

      <p>
        This is my attempt to write down what I know — not the polished
        retrospective kind, but the still-warm-from-the-forge kind. Expect
        revision.
      </p>

      <h2>Momentum is the product</h2>

      <p>
        The biggest mistake I made early in my career was treating shipping as
        the goal. It isn't. Momentum is. A codebase that ships once and stalls
        is worth less than one that ships weekly, even if the individual releases
        are smaller. Momentum compounds: it attracts contributors, it surfaces
        bugs before they calcify, and it keeps the team's mental model of the
        system current.
      </p>

      <p>
        The corollary is that anything which slows a team down — a flaky test
        suite, an ambiguous deploy process, a design system no one trusts — is
        a first-class problem, not a "nice to fix later" problem.
      </p>

      <h2>Small, reversible bets</h2>

      <p>
        The best builders I've worked with share a habit: they decompose large,
        irreversible decisions into smaller, reversible ones wherever possible.
        Not because they're indecisive, but because they understand that the
        value of optionality compounds just as surely as technical debt does.
      </p>

      <p>
        In practice this looks like: feature flags over big-bang releases,
        thin slices over full-stack epics, prototypes before infrastructure.
        Ask not "how do we build this?" but "what's the cheapest way to learn
        whether this is worth building?"
      </p>

      <h2>The craft part</h2>

      <p>
        None of the above works without a baseline of craft. Readable code,
        sensible abstractions, tests that describe intent rather than
        implementation. These aren't just aesthetic preferences — they're the
        substrate on which everything else runs.
      </p>

      <p>
        A concrete example: I've found that the single highest-leverage
        improvement most codebases can make is improving how they name things.
        A function named <code>handleData</code> tells you nothing; a function
        named <code>reconcileInventorySnapshot</code> tells you everything. Names
        are the cheapest form of documentation, and they pay dividends every time
        someone (including future-you) reads the code.
      </p>

      <h2>A note on tooling</h2>

      <p>
        Tooling matters, but it's easy to over-index on it. The goal is to
        reduce friction between idea and artifact. Sometimes that means adopting
        a new framework; more often it means getting better at the tools you
        already have. Here's a rough heuristic I use:
      </p>

      <pre>
        <code>{`if (frictionIsKillingMomentum && teamAgreesOnCause) {
  evaluateNewTool();
} else {
  masterCurrentTool();
}`}</code>
      </pre>

      <p>
        The condition is important. Introducing a new tool to a team that
        disagrees about the root cause of their friction is a reliable way to
        add more friction, not less.
      </p>

      <h2>What's next</h2>

      <p>
        I'll keep writing here — about specific technical problems I've
        encountered, decisions I've made (and regretted), and patterns that
        have proven durable across very different contexts. If any of this
        resonates, I'd genuinely love to hear from you at{" "}
        <a href="mailto:hello@humza.io">hello@humza.io</a>.
      </p>
    </>
  );
}
