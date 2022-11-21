export function addSearchParams(url: URL, searchParams: Record<string, unknown>): void {
    for (const [name, value] of Object.entries(searchParams)) {
        if (value !== undefined) {
            url.searchParams.set(name, String(value));
        }
    }
}
