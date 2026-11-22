# Gram: Implementation Plan

Milestones, work items, and how work is tracked in GitHub  
Prepared by Filliciano Plong  
October 23, 2026  
Version 1.0  

## Contents

- [Revision history](#revision-history)
- [1. Inputs and how to read this plan](#1-inputs-and-how-to-read-this-plan)
- [2. Versioning scheme](#2-versioning-scheme)
- [3. Milestones](#3-milestones)
- [4. Work items](#4-work-items)
- [5. Traceability](#5-traceability)
- [6. Definition of done](#6-definition-of-done)
- [7. Risks](#7-risks)
- [8. Tracker setup](#8-tracker-setup)
- [9. Decisions](#9-decisions)
- [10. Files](#10-files)

## Revision history

| Version | Date | Changes |
|---|---|---|
| 1.0 | October 23, 2026 | First version. |

## 1. Inputs and how to read this plan

**Readers:** Filliciano Plong, developer and tester of Gram. **Status:** first version. This plan is written before implementation begins.

| Input | Version or state |
|---|---|
| `docs/SRS.md` | 1.1, October 23, 2026: FR-01 to FR-94 and NFR-01 to NFR-37 (77 Must, 45 Should, 9 Could). |
| `docs/ARCHITECTURE.md` | 1.1, October 23, 2026: ADR-001 to ADR-011, milestones M1 to M7, spikes S-01 to S-03, risks R1 to R12. |
| Tracker | GitHub Issues in fillicianoplong/gram. Milestones map to GitHub milestones M1 to M7. Each work item maps to one issue, titled with its W-xx id. |
| How changes land | Direct commits on main, one commit per change. A commit that finishes an issue should close it. |
| Repository | fillicianoplong/gram. |

Items are numbered W-01 to W-44 in build order. Priority follows the SRS: Must is high, Should is medium, Could is low. A spike takes the priority of the work it unblocks, except S-03, which unblocks Should-priority Drive backup and is medium. Must work comes first. M1 produces a runnable development build. Typed logging in M2 comes before scale pairing in M3, as the architecture already states.

## 2. Versioning scheme

The app version is recorded in the package manifest and is raised when a change lands on main. Development builds use a 0.x version. 1.0.0 is reserved for the first Google Play release in M7. This document's version is 1.0, the plan itself, and is numbered separately from the app.

## 3. Milestones

| Milestone | Goal | Exit criteria | Items | High / Med / Low |
|---|---|---|---|---|
| **M1 Project setup and encrypted storage** | A runnable Android development build with Today, Foods, and Profile tabs, no account, and an encrypted on-device database. | The app launches on the test phone, the cipher_version check passes, Auto Backup is excluded, and an unopenable database offers Restore, Import, or Start fresh. | 8 (W-01–W-08) | 8 / 0 / 0 |
| **M2 Food lookup and custom foods** | Custom foods, My foods search, FDC lookup, and typed logging, so the app is useful without a scale. | A user can create a food, search FDC or My foods, and log typed grams or servings into an encrypted database. | 9 (W-09–W-17) | 7 / 1 / 1 |
| **M3 Scale pairing and live weighing** | Pair an Etekcity ESN00 (and a Weight Scale Service fallback) and log from the live weighing screen. | Spike S-01 is recorded. A paired scale shows live grams, and Log writes one snapshot entry. Closing the app writes nothing. | 6 (W-18–W-23) | 5 / 1 / 0 |
| **M4 Today screen and goals** | A day view with meal slots, editable entries, and FDA Daily Value goals that can be customized. | Today shows one day of entries against goals, with Under, Met, or Over in both color and text. | 6 (W-24–W-29) | 5 / 1 / 0 |
| **M5 Meals and recipes** | Weigh several items in one session and save them as a Meal or a Recipe food. | A multi-item session can be logged, saved as a Meal, or saved as a Recipe, and both can be logged later. | 3 (W-30–W-32) | 0 / 3 / 0 |
| **M6 Background weighing (Android)** | Notice a paired scale while the app is closed, notify, and hand off to the live weighing screen, without saving a weight until the user logs. | Spike S-02 is recorded. A closed-app placement notifies and can open the live screen, or Settings explains why background weighing is unavailable. Detectors share fixtures with their adapters. | 4 (W-33–W-36) | 2 / 2 / 0 |
| **M7 Onboarding, settings, backup, and Play release** | Settings and About, file backup and restore, optional Drive backup after S-03, accessibility, and a Play-ready build. | Export and import work, a damaged backup changes nothing, TalkBack and 200% font size pass, and the Play privacy policy and declarations match the app. | 8 (W-37–W-44) | 4 / 3 / 1 |

**Totals:** 44 items: 31 high, 11 medium, 2 low. Milestone dates are not scheduled. Work has not started.

**M1.** This milestone produces a runnable development build. Encrypted storage is what makes that shell match the architecture. Not scheduled.

**M2.** Typed logging in this milestone comes before scale pairing in M3, as the architecture already states. Not scheduled.

**M3.** Not scheduled. Starts after S-01.

**M4.** Not scheduled.

**M5.** Every item in this milestone is Should priority. Not scheduled.

**M6.** Most product behavior here is Should. NFR-35 (shared packet fixtures) is Must. Not scheduled. Starts after S-02.

**M7.** Not scheduled. Drive backup starts after S-03.

## 4. Work items

Each table is one milestone. **Covers** lists FR and NFR IDs. Acceptance is short Given / When / Then language.

### M1 Project setup and encrypted storage

**Goal:** A runnable Android development build with Today, Foods, and Profile tabs, no account, and an encrypted on-device database.

**Exit criteria:** The app launches on the test phone, the cipher_version check passes, Auto Backup is excluded, and an unopenable database offers Restore, Import, or Start fresh.

**Dates:** Not scheduled.

This milestone produces a runnable development build. Encrypted storage is what makes that shell match the architecture.

| ID | Title | Priority / type | Covers | Acceptance | Depends on |
|---|---|---|---|---|---|
| **W-01** | App shell: Android 12+ development build with Today, Foods, and Profile tabs | high / feature | FR-01, FR-02 | Given the app is built from the milestone's development build, when a tester exercises the work in W-01, then the behavior in FR-01, FR-02 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | None |
| **W-02** | No account and no server holding user data | high / feature | FR-04, NFR-07 | Given the app is built from the milestone's development build, when a tester exercises the work in W-02, then the behavior in FR-04, NFR-07 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | None |
| **W-03** | Encrypted SQLite with SQLCipher, Keystore key, and cipher_version check | high / feature | FR-86, NFR-09, NFR-36 | Given the app is built from the milestone's development build, when a tester exercises the work in W-03, then the behavior in FR-86, NFR-09, NFR-36 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms.<br>Mitigates R7. | W-01 |
| **W-04** | Exclude the database and key from Auto Backup and device transfer | high / chore | NFR-06 | Given the app is built from the milestone's development build, when a tester exercises the work in W-04, then the behavior in NFR-06 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-03 |
| **W-05** | Recover when the database key cannot open the file | high / feature | FR-90 | Given the app is built from the milestone's development build, when a tester exercises the work in W-05, then the behavior in FR-90 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-03 |
| **W-06** | Persist data across restarts and migrate the database safely | high / feature | NFR-04, NFR-29 | Given the app is built from the milestone's development build, when a tester exercises the work in W-06, then the behavior in NFR-04, NFR-29 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-03 |
| **W-07** | Explain each Android permission before asking, and keep typed entry working if one is denied | high / feature | FR-05 | Given the app is built from the milestone's development build, when a tester exercises the work in W-07, then the behavior in FR-05 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-01 |
| **W-08** | Typecheck, lint, unit tests, and CI | high / test | NFR-34 | Given CI is run on the branch, when the new tests execute, then they pass and cover the behavior in NFR-34.<br>Tests: the tests added in this item, plus typecheck and lint. | W-01 |

### M2 Food lookup and custom foods

**Goal:** Custom foods, My foods search, FDC lookup, and typed logging, so the app is useful without a scale.

**Exit criteria:** A user can create a food, search FDC or My foods, and log typed grams or servings into an encrypted database.

**Dates:** Not scheduled.

Typed logging in this milestone comes before scale pairing in M3, as the architecture already states.

| ID | Title | Priority / type | Covers | Acceptance | Depends on |
|---|---|---|---|---|---|
| **W-09** | Custom foods from the label fields, including unknown versus zero | high / feature | FR-18, FR-19, FR-20, FR-22, FR-23, FR-24 | Given the app is built from the milestone's development build, when a tester exercises the work in W-09, then the behavior in FR-18, FR-19, FR-20, FR-22, FR-23, FR-24 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-03 |
| **W-10** | Search My foods offline, ranked by recent and frequent use | high / feature | FR-11, NFR-14 | Given the app is built from the milestone's development build, when a tester exercises the work in W-10, then the behavior in FR-11, NFR-14 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-03, W-09 |
| **W-11** | Log in one transaction with a nutrient snapshot | high / feature | FR-21, FR-25, NFR-01, NFR-28 | Given the app is built from the milestone's development build, when a tester exercises the work in W-11, then the behavior in FR-21, FR-25, NFR-01, NFR-28 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-03, W-09 |
| **W-12** | Type grams or servings when logging | high / feature | FR-26, FR-27, FR-28 | Given the app is built from the milestone's development build, when a tester exercises the work in W-12, then the behavior in FR-26, FR-27, FR-28 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms.<br>Typed logging in this milestone is what makes the app useful without a scale. | W-11 |
| **W-13** | File each entry by local date and meal slot | high / feature | FR-29 | Given the app is built from the milestone's development build, when a tester exercises the work in W-13, then the behavior in FR-29 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-11 |
| **W-14** | Search FoodData Central, cache results in My foods, and handle errors | high / feature | FR-10, FR-12, FR-13, NFR-08, NFR-10, NFR-11, NFR-14, NFR-27, NFR-37 | Given the app is built from the milestone's development build, when a tester exercises the work in W-14, then the behavior in FR-10, FR-12, FR-13, NFR-08, NFR-10, NFR-11, NFR-14, NFR-27, NFR-37 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-10 |
| **W-15** | Log from My foods and edit entries while offline | high / feature | NFR-03 | Given the app is built from the milestone's development build, when a tester exercises the work in W-15, then the behavior in NFR-03 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-10, W-11 |
| **W-16** | Migrate earlier AsyncStorage MVP data into the database on first launch | low / feature | FR-94 | Given the app is built from the milestone's development build, when a tester exercises the work in W-16, then the behavior in FR-94 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms.<br>Could priority, as in the SRS. | W-03, W-11 |
| **W-17** | Personal FDC key, barcode scan, and typed barcode digits | medium / feature | FR-14, FR-15, FR-16, FR-17 | Given the app is built from the milestone's development build, when a tester exercises the work in W-17, then the behavior in FR-14, FR-15, FR-16, FR-17 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms.<br>Mitigates risks R6 and R11. | W-14 |

### M3 Scale pairing and live weighing

**Goal:** Pair an Etekcity ESN00 (and a Weight Scale Service fallback) and log from the live weighing screen.

**Exit criteria:** Spike S-01 is recorded. A paired scale shows live grams, and Log writes one snapshot entry. Closing the app writes nothing.

**Dates:** Not scheduled. Starts after S-01.

| ID | Title | Priority / type | Covers | Acceptance | Depends on |
|---|---|---|---|---|---|
| **W-18** | Spike S-01: capture ESN00 services and packets, and build adapter fixtures | high / spike | FR-30 | Given the spike is run on the test phone, when the checks finish, then the result is recorded in the SRS or architecture.<br>Tests: the recorded result, plus any fixtures the spike adds.<br>Required before the ESN00 adapter. Mitigates R1. | None |
| **W-19** | Scale adapter interface, ESN00 adapter, and unit conversion to grams | high / feature | FR-30, FR-33, NFR-33, NFR-34 | Given the app is built from the milestone's development build, when a tester exercises the work in W-19, then the behavior in FR-30, FR-33, NFR-33, NFR-34 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-18 |
| **W-20** | Scan, pair, name, switch, and forget scales | high / feature | FR-31, FR-32, FR-34, FR-36, FR-81 | Given the app is built from the milestone's development build, when a tester exercises the work in W-20, then the behavior in FR-31, FR-32, FR-34, FR-36, FR-81 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-19 |
| **W-21** | Live weighing screen: live grams, stability, macros, and Log | high / feature | FR-37, FR-38, FR-39, FR-40, FR-41, NFR-13, NFR-15, NFR-20, NFR-22 | Given the app is built from the milestone's development build, when a tester exercises the work in W-21, then the behavior in FR-37, FR-38, FR-39, FR-40, FR-41, NFR-13, NFR-15, NFR-20, NFR-22 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-12, W-20 |
| **W-22** | Do not save a weight or entry while the app is closed | high / feature | FR-42, NFR-02 | Given the app is built from the milestone's development build, when a tester exercises the work in W-22, then the behavior in FR-42, NFR-02 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms.<br>This Must rule stays in force when background weighing is added in M6. | W-11 |
| **W-23** | Weight Scale Service fallback adapter | medium / feature | FR-30, FR-35, NFR-33 | Given the app is built from the milestone's development build, when a tester exercises the work in W-23, then the behavior in FR-30, FR-35, NFR-33 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms.<br>Could-priority Weight Scale Service adapter used as a fallback; 5 g resolution is coarse (R4). | W-19 |

### M4 Today screen and goals

**Goal:** A day view with meal slots, editable entries, and FDA Daily Value goals that can be customized.

**Exit criteria:** Today shows one day of entries against goals, with Under, Met, or Over in both color and text.

**Dates:** Not scheduled.

| ID | Title | Priority / type | Covers | Acceptance | Depends on |
|---|---|---|---|---|---|
| **W-24** | Today screen: one day, meal groups, active scale, and Weigh | high / feature | FR-60, FR-61, FR-62, NFR-16, NFR-17 | Given the app is built from the milestone's development build, when a tester exercises the work in W-24, then the behavior in FR-60, FR-61, FR-62, NFR-16, NFR-17 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-13, W-21 |
| **W-25** | Edit or delete an entry, with Undo and a button for every swipe | high / feature | FR-63, NFR-25 | Given the app is built from the milestone's development build, when a tester exercises the work in W-25, then the behavior in FR-63, NFR-25 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-24 |
| **W-26** | Goals: Daily Value defaults, limits, custom goals, and the partial flag | high / feature | FR-03, FR-68, FR-69, FR-70, FR-71, FR-72 | Given the app is built from the milestone's development build, when a tester exercises the work in W-26, then the behavior in FR-03, FR-68, FR-69, FR-70, FR-71, FR-72 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms.<br>Mitigates R9. | W-24 |
| **W-27** | Nutrient summary with Under, Met, or Over in color and in text | high / feature | FR-64, FR-65, NFR-24 | Given the app is built from the milestone's development build, when a tester exercises the work in W-27, then the behavior in FR-64, FR-65, NFR-24 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-26 |
| **W-28** | Store metric units and display food weight in g, oz, or lb and oz | high / feature | FR-78, FR-79, FR-80 | Given the app is built from the milestone's development build, when a tester exercises the work in W-28, then the behavior in FR-78, FR-79, FR-80 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-12, W-24 |
| **W-29** | Calendar jump and pinned goal bars or rings | medium / feature | FR-66, FR-67, FR-73 | Given the app is built from the milestone's development build, when a tester exercises the work in W-29, then the behavior in FR-66, FR-67, FR-73 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-26 |

### M5 Meals and recipes

**Goal:** Weigh several items in one session and save them as a Meal or a Recipe food.

**Exit criteria:** A multi-item session can be logged, saved as a Meal, or saved as a Recipe, and both can be logged later.

**Dates:** Not scheduled.

Every item in this milestone is Should priority.

| ID | Title | Priority / type | Covers | Acceptance | Depends on |
|---|---|---|---|---|---|
| **W-30** | Weigh several: tare and add, running totals, and log one entry per item | medium / feature | FR-48, FR-49, FR-50, FR-51 | Given the app is built from the milestone's development build, when a tester exercises the work in W-30, then the behavior in FR-48, FR-49, FR-50, FR-51 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-21 |
| **W-31** | Save and log a Meal, including scale-to-total | medium / feature | FR-52, FR-53, FR-54 | Given the app is built from the milestone's development build, when a tester exercises the work in W-31, then the behavior in FR-52, FR-53, FR-54 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-30 |
| **W-32** | Save a Recipe food and log a portion of it | medium / feature | FR-55, FR-56, FR-57, FR-58, FR-59 | Given the app is built from the milestone's development build, when a tester exercises the work in W-32, then the behavior in FR-55, FR-56, FR-57, FR-58, FR-59 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-30 |

### M6 Background weighing (Android)

**Goal:** Notice a paired scale while the app is closed, notify, and hand off to the live weighing screen, without saving a weight until the user logs.

**Exit criteria:** Spike S-02 is recorded. A closed-app placement notifies and can open the live screen, or Settings explains why background weighing is unavailable. Detectors share fixtures with their adapters.

**Dates:** Not scheduled. Starts after S-02.

Most product behavior here is Should. NFR-35 (shared packet fixtures) is Must.

| ID | Title | Priority / type | Covers | Acceptance | Depends on |
|---|---|---|---|---|---|
| **W-33** | Spike S-02: Companion Device Manager presence, Kotlin detector, and handover | high / spike | FR-43, NFR-35 | Given the spike is run on the test phone, when the checks finish, then the result is recorded in the SRS or architecture.<br>Tests: the recorded result, plus any fixtures the spike adds.<br>Required before background weighing. Mitigates R2 and R12. | W-19 |
| **W-34** | Background detection, notification, and open-from-notification | medium / feature | FR-43, FR-44, FR-45, FR-46, NFR-18, NFR-19 | Given the app is built from the milestone's development build, when a tester exercises the work in W-34, then the behavior in FR-43, FR-44, FR-45, FR-46, NFR-18, NFR-19 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-33, W-22 |
| **W-35** | Run TypeScript and Kotlin detectors on the same captured-packet fixtures | high / test | NFR-35, NFR-34 | Given CI is run on the branch, when the new tests execute, then they pass and cover the behavior in NFR-35, NFR-34.<br>Tests: the tests added in this item, plus typecheck and lint. | W-33, W-19 |
| **W-36** | Settings copy when background weighing is unavailable | medium / feature | FR-47 | Given the app is built from the milestone's development build, when a tester exercises the work in W-36, then the behavior in FR-47 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-34 |

### M7 Onboarding, settings, backup, and Play release

**Goal:** Settings and About, file backup and restore, optional Drive backup after S-03, accessibility, and a Play-ready build.

**Exit criteria:** Export and import work, a damaged backup changes nothing, TalkBack and 200% font size pass, and the Play privacy policy and declarations match the app.

**Dates:** Not scheduled. Drive backup starts after S-03.

| ID | Title | Priority / type | Covers | Acceptance | Depends on |
|---|---|---|---|---|---|
| **W-37** | Spike S-03: Drive app-data backup and restore | medium / spike | FR-92, NFR-12 | Given the spike is run on the test phone, when the checks finish, then the result is recorded in the SRS or architecture.<br>Tests: the recorded result, plus any fixtures the spike adds.<br>Required before Drive backup. Mitigates R10. | W-38 |
| **W-38** | File export, import, backup checks, and delete-all data | high / feature | FR-82, FR-87, FR-88, FR-89, FR-91, NFR-05 | Given the app is built from the milestone's development build, when a tester exercises the work in W-38, then the behavior in FR-82, FR-87, FR-88, FR-89, FR-91, NFR-05 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-03, W-06 |
| **W-39** | Google Drive app-private backup and restore | medium / feature | FR-92, FR-93, NFR-12, NFR-30 | Given the app is built from the milestone's development build, when a tester exercises the work in W-39, then the behavior in FR-92, FR-93, NFR-12, NFR-30 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-37, W-38 |
| **W-40** | Settings, About, theme, and weighing options | high / feature | FR-83, FR-84, FR-85 | Given the app is built from the milestone's development build, when a tester exercises the work in W-40, then the behavior in FR-83, FR-84, FR-85 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms.<br>FR-83 is Must. Theme and weighing options are Should. | W-01, W-20 |
| **W-41** | First-run onboarding, skippable, with a way to show it again | medium / feature | FR-06, FR-07, FR-08, FR-09, NFR-21 | Given the app is built from the milestone's development build, when a tester exercises the work in W-41, then the behavior in FR-06, FR-07, FR-08, FR-09, NFR-21 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-20, W-26, W-40 |
| **W-42** | Accessibility pass: TalkBack, 200% font size, 48 dp targets, reduced motion | high / feature | NFR-22, NFR-23, NFR-25, NFR-26 | Given the app is built from the milestone's development build, when a tester exercises the work in W-42, then the behavior in NFR-22, NFR-23, NFR-25, NFR-26 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-21, W-24, W-27 |
| **W-43** | Play target API, privacy policy, and review declarations | high / packaging | NFR-31, NFR-32 | Given the app is built from the milestone's development build, when a tester exercises the work in W-43, then the behavior in NFR-31, NFR-32 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms.<br>Mitigates R3 and R8. Android first; iOS is later (ADR-009) and is out of this plan. | W-38, W-42 |
| **W-44** | Optional on-phone profile fields for display only | low / feature | FR-74, FR-75, FR-76, FR-77 | Given the app is built from the milestone's development build, when a tester exercises the work in W-44, then the behavior in FR-74, FR-75, FR-76, FR-77 holds.<br>Tests: unit tests where the work is logic; a device check for Bluetooth, permissions, or Play forms. | W-40 |

## 5. Traceability

Every Must requirement in SRS 1.1 was checked against the Covers column. 77 Must requirements (51 FRs and 26 NFRs) each map to at least one work item.

| Area | Requirements | Milestone |
|---|---|---|
| App shell and permissions | FR-01 to FR-05, NFR-07 | M1 |
| Encrypted storage and migrations | FR-86, FR-90, NFR-04, NFR-06, NFR-09, NFR-29 | M1 |
| Foods, FDC, and typed logging | FR-10 to FR-21, FR-25 to FR-29, NFR-01, NFR-03, NFR-08, NFR-10, NFR-11, NFR-14, NFR-27, NFR-28 | M2 |
| Scales and live weighing | FR-30 to FR-33, FR-37 to FR-42, FR-81, NFR-02, NFR-13, NFR-15, NFR-33, NFR-34 | M3 |
| Today and goals | FR-03, FR-60 to FR-65, FR-68 to FR-72, FR-78 to FR-80, NFR-24, NFR-25 | M4 |
| Meals and recipes | FR-48 to FR-59 (Should) | M5 |
| Background weighing | FR-43 to FR-47 (Should), NFR-35 (Must) | M6 |
| Settings, backup, accessibility, Play | FR-82, FR-83, FR-87 to FR-91, NFR-05, NFR-22, NFR-23, NFR-31, NFR-32 | M7 |

**Must gaps:** none. Every Must FR and NFR maps to at least one work item.

**Should gaps:** none.

**Could gaps:** none.

Should quality rules such as cold-start time, list speed, and repository access are attached to the feature items they constrain.

## 6. Definition of done

### 6.1 Plan level

- A milestone is done when its exit criteria hold and every Must item in it is complete.
- Spikes S-01, S-02, and S-03 are done before the milestones they unblock (M3, M6, and Drive backup in M7).
- The first Play release is done when every Must item in M1 through M7, except work formally cut in writing, is complete.

### 6.2 Per item

Every tracked item uses this wording:

- The item's acceptance checklist is ticked.
- Tests, typecheck, and lint pass in CI.
- New behavior has tests at the right layer, including unit tests for nutrient math, totals, goal checks, and packet parsing without Bluetooth.
- Any UNVERIFIED item this work settles has a proposed doc edit.
- The work lands in one commit on main.
- The GitHub issue is closed.

## 7. Risks

These risks are taken from Architecture 1.1, section 6, with the work items that carry the next step. Owner: Filliciano Plong.

| ID | Risk | Next step | Due / items |
|---|---|---|---|
| R1 | ESN00 protocol unverified (one unfinished 2022 project). | S-01; base adapter tests on captures. | M3 / W-18, W-19 |
| R2 | Companion Device Manager presence may be late or missing on the test phone. | S-02; fall back to app-open weighing (FR-47). | M6 / W-33, W-36 |
| R3 | Google Play may question the connectedDevice foreground service. | Short declaration and demo video showing it runs only while weighing. | M7 / W-43 |
| R4 | Few kitchen scales use 0x181D, and its 5 g resolution is coarse. | Treat it as a fallback; add vendor adapters one at a time (OD-13). | After M7 / W-23 |
| R5 | Ignored notifications mean lost weights (ADR-007). | Watch for it in daily use. | After M7 |
| R6 | The built-in FDC key is extracted and revoked, or the hourly limit is hit. | Caching, the 400 ms search pause, HTTP 429 handling, and the personal key (FR-14). | M2 / W-14, W-17 |
| R7 | SQLCipher missing from a build fails silently. | The cipher_version check fails loudly in development. | M1 / W-03 |
| R8 | Play needs a privacy policy, Data safety, and the health apps declaration even with no server. | Short policy on GitHub Pages (OD-12); forms per SRS section 9.11. | M7 / W-43 |
| R9 | Daily Values may be read as personal advice; partial data can understate totals. | Label defaults as a general 2,000-calorie reference; show the partial flag. | M4 / W-26 |
| R10 | Backup library untested; scheduled backups run only when the app opens. | S-03; say so in Settings (FR-93). | M7 / W-37, W-39 |
| R11 | FDC barcode format may not match scans (12-digit or padded). | Test real products (FR-17). | M2 / W-17 |
| R12 | The TypeScript and Kotlin parsers for a scale drift apart. | Both run the same captured-packet fixtures in CI (NFR-35). | M6 / W-35 |

## 8. Tracker setup

File the plan in GitHub using the mapping below. Nothing in this section has been filed yet.

| Plan idea | In GitHub |
|---|---|
| Milestone M1–M7 | A GitHub milestone. Issues belong to it. Pull requests, if any are used later, do not. |
| Work item W-xx | One issue, titled with the W-xx id. |
| Priority high / medium / low | Labels `priority:high`, `priority:medium`, `priority:low`. |
| Type | Labels such as `type:feature`, `type:spike`, `type:chore`, `type:test`, `type:packaging`. |
| FR and NFR IDs | In the issue body. |
| Definition of done | The wording in section 6, in the issue body. |
| Closing work | The finishing commit should close the issue. Issues, not commits, belong in the milestone. |

The item table in section 4 is the list that will be filed after this plan is in the repository.

## 9. Decisions

- GitHub Issues is the tracker. Changes land as direct commits on main.
- Milestones follow Architecture 1.1: M1 to M7, with spikes S-01 before M3, S-02 before M6, and S-03 before Drive backup in M7.
- Typed logging is in M2, before scale pairing in M3.
- Android is first; iOS is later (ADR-009) and is out of this plan.
- Recipes are foods; meals log one entry per item (ADR-011).
- Weights are not saved while the app is closed (ADR-007, FR-42).
- The app version is raised when a change lands on main, and 1.0.0 is reserved for the first Play release in M7.
- The definition of done is the wording in section 6.
- FR-94 (migrate earlier AsyncStorage MVP data) stays in the plan as a Could item (W-16).

## 10. Files

| File | Role |
|---|---|
| `docs/IMPLEMENTATION_PLAN.md` | Source text of this plan. |
| `docs/Plong_Gram_Implementation_Plan.docx` | Word copy in the project house style. |
| `docs/out/Plong_Gram_Implementation_Plan.pdf` | PDF copy. |

Related project documents: `docs/SRS.md` (1.1) and `docs/ARCHITECTURE.md` (1.1).
