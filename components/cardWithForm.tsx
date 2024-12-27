import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { InputFile } from "./picture_input"

export function CardWithForm({onClick, formData, onFormChange}) {
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        onFormChange(id, value); // Appelle la fonction parent pour mettre à jour le state
        };

    const handleFileChange = (file) => {
        onFormChange("file", file); // Appelle la fonction parent pour gérer le fichier
        };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Appliquer un filigrane</CardTitle>
        <CardDescription>Appliquer une watermark à vos documents.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => {
          e.preventDefault(); // Empêche le rechargement de la page
          if (onClick) onClick(); // Appelle la fonction passée en prop
        }}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <InputFile onFileChange={handleFileChange}></InputFile>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Filigrane à appliquer</Label>
              <Input id="watermark"
                value={formData.watermark}
                onChange={handleInputChange}
                placeholder="Document pour location d'appartement meublé." />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={(onClick)} className="w-full">Appliquer</Button>
      </CardFooter>
    </Card>
  )
}
