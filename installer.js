require('package-script').spawn([
    {
        command: "npm",
        args: ["install", "-g", "grunt-cli"]
    },
    {
        command: "npm",
        args: ["install", "-g", "bower"]
    },
    {
        command: "npm",
        args: ["install", "-g", "istanbul"]
    },
    {
        command: "npm",
        args: ["install", "-g", "mocha-phantomjs"]
    }
]);
