import { StringOption } from 'necord';
import { Spec } from 'generated/prisma/enums';

export class RegisterCharacterDto {
  @StringOption({
    name: 'name',
    description: 'Character name',
    required: true,
  })
  name: string;
}
export class findCharName {
  @StringOption({
    name: 'name',
    description: 'Character name',
    required: true,
  })
  name: string;
}

export class deleteChar {
  @StringOption({
    name: 'name',
    description: 'Character name',
    required: true,
  })
  name: string;
}
