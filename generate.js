const fs = require("fs");
const { exec } = require("child_process");

// 1. Define UML content
const umlContent = `
@startuml
Alice -> Bob: Hello Bob
Bob -> Alice: Hello Alice
@enduml
`;

// 2. Save it as a file
fs.writeFileSync("diagram.puml", umlContent);

// 3. Run PlantUML
exec("plantuml diagram.puml", (error, stdout, stderr) => {
  if (error) {
    console.error("Error:", error);
    return;
  }

  console.log("Diagram generated successfully.");
});

