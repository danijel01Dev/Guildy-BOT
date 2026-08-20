import { StringOption } from "necord";





export  class CreateSignupDto
     {
     @StringOption({
        name: 'name',
        description: 'Character name',
        required: true,
      })
      name: string;
}