const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// 1. Define UML content
const umlContent = `
@startuml
skinparam actorStyle awesome
:User: --> (Use)
"Main Admin" as Admin
"Use the application" as (Use)
Admin --> (Admin the application)
@enduml
`;

// 2. Save it as a file
const pathToFile = path.join(__dirname, "../../shared", "diagram.puml");
fs.writeFileSync(pathToFile, umlContent);
console.log("File Write Successful!");

// 3. Run PlantUML
 exec("plantuml diagram.puml", (error, stdout, stderr) => {
    if (error) {
        return console.error("Error:", error);
  }

  console.log("Diagram generated successfully.");
});
