# Database Seeds

This directory contains database seeders to populate your portfolio database with initial data.

## Structure

- **portifolio.seeder.ts** - Seeds the main portfolio record
- **experience.seeder.ts** - Seeds work experiences from `experiences.json`
- **hardSkill.seeder.ts** - Seeds hard skills from `hardSkills.json`
- **certificate.seeder.ts** - Seeds sample certificates
- **index.ts** - Main seeder runner that executes all seeders in order

## Usage

### Run all seeds

```bash
npm run seed
```

This will:
1. Create a portfolio entry (if it doesn't exist)
2. Import experiences from `experiences.json`
3. Import hard skills from `hardSkills.json`
4. Create sample certificates

### Data Sources

- Experiences: `/backend/experiences.json`
- Hard Skills: `/backend/hardSkills.json`
- Certificates: Hardcoded sample data (modify in `certificate.seeder.ts`)

## Notes

- Seeds are idempotent - they check if data already exists before inserting
- Seeds must be run after migrations are executed
- The portfolio record (ID: 1) is required for other seeds
- Hard skills percentage is automatically calculated based on experience duration

## Modifying Seeds

To add more seed data:
1. Update the JSON files or
2. Create a new seeder class following the existing pattern
3. Add it to `index.ts` in the appropriate order
