// eslint-disable-next-line @typescript-eslint/no-var-requires
const { SpecReporter } = require("jasmine-spec-reporter");

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
  new SpecReporter({
    suite: {
      displayNumber: true,
    },
    spec: {
      displayPending: true,
    },
    summary: {
      displayDuration: false,
    },
  })
);
