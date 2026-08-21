import { Experience } from "../experience/experience.type"

export type Portifolio = {
    id: number,
    name: string,
    lastname: string,
    role?: string | null,
    aboutMe?: string | null,
    experiences: Experience[]
}
