import { Tags } from '../../tags/models/tags';
import { Base } from 'src/app/core/models/base';
import { File } from './file';

export class Document extends Base {
  id: number;
  name: string;
  description: string;
  status: string;
  createdBy: string;
  createdName: string;
  verifiedId: string;
  verifiedName: string;
  dueDate: Date;
  tags: Tags[];
  tagsLabel: string;
  files: File[];
}
