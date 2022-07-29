import { useEffect, useState } from 'react';
import { filetoDataURL } from 'image-conversion';

const useFileToURL = (file) => {
    const [url, setUrl] = useState(null);

    useEffect(() => {
        if(!file) {
            setUrl(null);
            return;
        }

        (async () => {
            try {
                const url = await filetoDataURL(file);
                setUrl(url);
            } catch (error) {
                console.log(error);
                setUrl(null);
            }
        })();
    }, [file]);

    return url
}

export default useFileToURL;