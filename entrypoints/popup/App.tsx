import './App.css';
import React, {useEffect, useRef, useState} from 'react';


import { CardWithForm } from '@/components/cardWithForm';
import { Button } from '@/components/ui/button';
// function App() {

//     async function sendMessageToBackground() {
//         let response = await browser.runtime.sendMessage({eventType: MessageType.clickExtIcon});
//         console.log(response)
//     }

//     return (
//         <div className="grid grid-cols-1 gap-3">
//             <Button onClick={sendMessageToBackground}>send message</Button>
//         </div>
//     );
// }

function App() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        file: null, // Pour un fichier si nécessaire
        watermark: "", // Champ pour le texte de filigrane
      });
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [preview, setPreview] = useState({
        url: null
      });

    const handleFormChange = (key, value) => {
        setFormData((prevData) => ({
          ...prevData,
          [key]: value,
        }));
      };
      // Fonction appelée au clic du bouton
    const handleSubmit = async () => {
        console.log(formData)
        if (formData.file) {
        const formData2 = new FormData();
        formData2.append('files[]', formData.file);
        formData2.append('watermark', formData.watermark)
        console.log(formData2)
        const response = await fetch('https://api.filigrane.beta.gouv.fr/api/document/files', {
            method: 'POST',
            headers: {
              'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0',
              'Accept': 'application/json, text/plain, */*',
            },
            body: formData2
          });
        console.log(response)
        if (response.ok) {
            var result = await response.json()
            var token = result.token
            console.log('https://api.filigrane.beta.gouv.fr/api/document/'+token)
            setTimeout(() => {
                console.log('Après 2 secondes');
                window.open('https://api.filigrane.beta.gouv.fr/api/document/'+token, '_blank');
              }, 3000);
            setPreview({url: 'https://api.filigrane.beta.gouv.fr/api/document/'+token})
        }}else{
            console.log("No file specified")
        }
        //setIsSubmitted(true); // Change l'état
    };
    
    useEffect(() => {
        if (formData.file && formData.file.type.startsWith("image/")) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreview(reader.result as string); // Met à jour l'état avec l'URL de l'image
          };
          reader.readAsDataURL(formData.file); // Lit le fichier comme DataURL
        }
      }, [formData.file]); 

      
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {isSubmitted ? (
              <div className="text-center">
                <h1>Filigrane appliqué avec succès !</h1>
                <p>Merci d'utiliser notre service.</p>
              </div>
            ) : (
              <CardWithForm
              formData={formData}
              onFormChange={handleFormChange}
              onClick={handleSubmit} />
            )}
            {imagePreview ? (
                <div className="mt-4 text-center">
                <h3>Aperçu de l'image :</h3>
                <img src={imagePreview} alt="Aperçu" className="max-w-full" />
                </div>
            ) : null}
            {
                (preview.url ? <Button onClick={() => {
                    if (preview.url) {
                      // Charger l'URL dans l'onglet actuel
                      window.open(preview.url, '_blank');
                
                      // Fermer la popup
                      window.close();
                    }
                  }} >Rouvrir l'image</Button> : null)
            }
        </div>
            
    )
}
//                 <a href={preview.url}>Fichier</a> 

export default App;