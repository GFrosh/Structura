## Environmental Health System — Class Diagram Walkthrough

### Overview

This guide shows how to use the Structura app to build a Class Diagram for an Environmental Health System (EHS). It covers which classes to create, suggested attributes and methods, how to add relationships, and how to generate and download the diagram as an SVG.

### Prerequisites

- Open the app in a browser (serve the project or open `client/index.html`).
- PlantUML must be available to the app's backend for diagram generation (see `server.js`).

---

### 1 — Set Up the App

1. Open `client/index.html` in your browser or start the local server that serves the project.
2. In the header `Diagram` dropdown select `Class Diagram`.

### 2 — Add Classes

Use the left `Classes` pane:

- Add the following classes (type the name and click `Add Class`):
  - `Facility`
  - `Inspector`
  - `SeniorInspector` (will be a subclass of `Inspector`)
  - `Inspection`
  - `Violation`
  - `Permit`
  - `EnvironmentalReport`

### 3 — Edit Classes: Attributes & Methods

Click a class name in the `Classes` list to open the `Class Details` editor in the center pane. Use the `Attributes` form and `Methods` form to add entries.

Suggested attributes and methods (visibility shown as `+` public, `-` private, `#` protected):

- Facility
  - Attributes: `+ facilityId: String`, `+ name: String`, `+ address: String`, `+ latitude: Double`, `+ longitude: Double`, `+ permitStatus: String`
  - Methods: `+ scheduleInspection(date: Date): void`, `+ getActivePermit(): Permit`

- Inspector
  - Attributes: `+ inspectorId: String`, `+ name: String`, `+ certificationLevel: String`
  - Methods: `+ performInspection(inspection: Inspection): void`, `+ submitReport(report: EnvironmentalReport): void`

- SeniorInspector
  - Inherits from `Inspector`; optional attribute: `+ supervisorLevel: int`

- Inspection
  - Attributes: `+ inspectionId: String`, `+ date: Date`, `+ result: String`, `+ score: int`
  - Methods: `+ addViolation(v: Violation): void`, `+ finalize(): void`

- Violation
  - Attributes: `+ violationId: String`, `+ description: String`, `+ severity: String`, `+ isResolved: boolean`
  - Methods: `+ resolve(): void`

- Permit
  - Attributes: `+ permitId: String`, `+ issueDate: Date`, `+ expiryDate: Date`, `+ isActive: boolean`
  - Methods: `+ renew(durationMonths: int): void`

- EnvironmentalReport
  - Attributes: `+ reportId: String`, `+ generatedOn: Date`, `+ summary: String`
  - Methods: `+ generateReport(): EnvironmentalReport`

Notes:
- Use the `Static` checkbox when an attribute or method should be static.
- Use the `Abstract Class` checkbox to mark a class abstract; use the `Abstract` checkbox on methods when needed.

### 4 — Add Relationships

In the `Class Relationships` area (center builder) click `Add Relationship` for each relationship you need. For each row, choose `from`, `to`, and a `type` from: `Inheritance`, `Composition`, `Aggregation`, `Association`.

Recommended relationships for EHS:

- `Inspector` → `Inspection`: Association (an inspector performs inspections)
- `Facility` → `Inspection`: Aggregation (facility aggregates inspections; one-to-many)
- `Inspection` → `Violation`: Composition (violations belong to an inspection)
- `Facility` → `Permit`: Association (facilities have permits)
- `EnvironmentalReport` → `Inspection`: Aggregation (reports aggregate inspections)
- `SeniorInspector` <|-- `Inspector`: Inheritance (make `SeniorInspector` inherit `Inspector`) — note: set the subclass `from` to `SeniorInspector` and `to` to `Inspector` and choose `Inheritance`.

If you need multiplicities, annotate the relationship label or record them in attribute names (e.g., `inspections: List<Inspection>` on `Facility`). The app exports relationship symbols to PlantUML.

### 5 — Generate, Preview, and Download

1. Click `Generate` in the header.
2. The right preview pane will show the generated SVG produced by PlantUML.
3. To save the diagram, click `Download` to download the SVG file.

If the preview shows layout or text issues, adjust class names, attributes, or relationships and click `Generate` again.

### 6 — How the App Maps to PlantUML

- Attributes: rendered as `visibility {static}? name: type` (e.g., `+ {static} facilityId: String`).
- Methods: rendered as `visibility {static}? {abstract}? name(params): returnType`.
- Relationships: mapped to PlantUML symbols:
  - Inheritance → `<|--`
  - Composition → `*--`
  - Aggregation → `o--`
  - Association → `--`

Example PlantUML snippet the app produces (illustrative):

```
@startuml
class "Facility" {
  + facilityId: String
  + name: String
  --
  + scheduleInspection(date: Date): void
}

class "Inspection" {
  + inspectionId: String
  + date: Date
  --
  + addViolation(v: Violation): void
}

"Facility" o-- "Inspection"
"Inspection" *-- "Violation"
@enduml
```

### Next steps

- To auto-populate the app with this EHS example, run the UI steps above manually or ask me to populate `client/app.js` state with the example data.
- Want me to auto-populate and generate the SVG now? Reply `yes` and I will add the example data and generate PlantUML output.
