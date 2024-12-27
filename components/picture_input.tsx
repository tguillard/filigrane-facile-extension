import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
interface InputFileProps {
    onFileChange: (file: File | null) => void; // Déclarez le type de la prop
  }
export const InputFile: React.FC<InputFileProps> = ({ onFileChange }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0] || null; // Récupère le fichier ou null
      onFileChange(file); // Appelle la fonction passée en prop
    };
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="picture">Fichier</Label>
      <Input id="picture" type="file" accept="image/*,.pdf" onChange={handleChange} />
    </div>
  )
}
