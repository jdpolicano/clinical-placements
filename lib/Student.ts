export default class Student {
    private name: string;
    private preferences: string[];
    private prefIndex: number;

    constructor(name: string, preferences: string[]) {
        this.name = name;
        this.preferences = preferences;
        this.prefIndex = 0;
    }

    /**
     * @returns The name of the student
     */
    public getName(): string {
        return this.name;
    }

    /**
     * @returns The preferences of the student
     */
    public getPreferences(): string[] {
        return this.preferences;
    }

    /**
     * return the next prefered clinical for the student and increment the index
     * @returns The preferred clinical
     */
    public nextPreferedClinical(): string {
        if (this.prefIndex >= this.preferences.length) {
            throw new Error('No more preferences to process for this student');
        } else {
            return this.preferences[this.prefIndex++]!;
        }
    }

    /**
     * Rank the clinicals based on the student's preferences
     * A lower rank is better
     * @param clinical The clinical to rank
     * @returns The rank of the clinical
     */
    public rank(clinical: string): number {
        return this.preferences.indexOf(clinical);
    }
}