
export const parseUrlQuery = () => {
    const params = new URLSearchParams(window.location.search)
    
        const query: Record<string, string | string[]> = {};
        for (const [key, value] of params.entries()) {
            query[key] = value;
        }

console.log('when effect happened: ',query.meme);

    return {query}

    
        
    }