export default function calculateDatation(
  yspq: number,
  ysaq: number,
  yepq: number,
  yeaq: number
) {
  if ((yspq === ysaq) === (yepq === yeaq)) {
    return `${yspq}`;
  } else {
    let ys = yspq === ysaq ? `${yspq}` : `${yspq}–${ysaq}`;
    let ye = yepq === yeaq ? `${yepq}` : `${yepq}–${yeaq}`;
    return `${ys}/${ye}`;
  }
}
