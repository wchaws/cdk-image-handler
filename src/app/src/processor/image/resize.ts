import { IImageAction, IImageContext } from '.';
import { IActionOpts } from '..';

export const enum Mode {
  LFIT = 'lft',
  MFIT = 'mfit',
  FILL = 'fill',
  PAD = 'pad',
  FIXED = 'fixed'
}

export interface IImageOpts extends IActionOpts {
  m?: Mode;
  w?: number;
  h?: number;
  l?: number;
  s?: number;
  limit?: boolean;
  color?: string;
}

export class ImageResizeAction implements IImageAction {
  public readonly name: string = 'resize';

  public validate(params: string[]): IImageOpts {
    const opt: IImageOpts = {};
    for (const p of params) {
      if ((this.name === p) || (!p)) {
        continue;
      }
      const [k, v] = p.split('_');
      if (k === 'w') {
        opt.w = parseInt(v);
      } else if (k === 'h') {
        opt.h = parseInt(v);
      } else if (k === 'm') {
        if (v && ((v === Mode.LFIT) || (v === Mode.MFIT) || (v === Mode.FILL) || (v === Mode.PAD) || (v === Mode.FIXED))) {
          opt.m = v;
        } else {
          throw new Error(`Unkown m: "${v}"`);
        }
      } else {
        throw new Error(`Unkown param: "${k}"`);
      }
    }
    return opt;
  }
  public process(ctx: IImageContext, params: string[]): void {
    const opt = this.validate(params);

    ctx.image = ctx.image.resize(opt.w, opt.h);
  }
}