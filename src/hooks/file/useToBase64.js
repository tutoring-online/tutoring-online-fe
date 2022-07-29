const { useState, useEffect, useRef } = require("react");

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const useToBase64 = (file) => {
    const [base64, setBase64] = useState(null);
    const [loading, setLoading] = useState(false);

    const mounted = useRef(null);

    useEffect(() => {
        if (!file) {
            setBase64(null);
            return
        }

        const process = async () => {
            try {
                setLoading(true);
                const base64 = await toBase64(file);
                if (!mounted.current !== true) return;
                const result = base64.split(',')[1];
                setBase64(result);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        }

        process();

        return () => mounted.current = false;
    }, [file]);

    return {
        base64,
        loading
    };
}

export default useToBase64;

