import { Parser, Writer } from 'n3'
import type * as rdf from 'rdf-js'

export type TrigString = string
export type TrigPackage = rdf.Quad[]
export type TrigPackageString = TrigString

export async function serializeTrigPackageToTrigString (content: TrigPackage): Promise<TrigString> {
  return await new Promise((resolve, reject) => {
    const writer = new Writer({ format: 'application/trig', prefixes: { ex: 'http://example.com/' } })
    writer.addQuads(content)
    writer.end((error, result) => {
      if (error || !result) {
        throw new Error('Could not serialize package string correctly')
      }
      resolve(indentTrigString(result as string))
    })
  })
}
export function parseTrigStringToTrigPackage (content: TrigString): TrigPackage {
  return new Parser({ format: 'application/trig' }).parse(content)
}

function indentTrigString (trigString: TrigString): TrigString {
  let result = ''
  const indent = '\t'
  let indented = false
  for (let line of trigString.split('\n')) {
    line = line.replace(/\s\s+/g, '\t')
    if (line.includes('{')) {
      indented = true
      result += line + '\n'
    } else if (line.includes('}')) {
      indented = false
      result += line + '\n'
    } else {
      result += indented ? indent + line + '\n' : line + '\n'
    }
  }
  return result.trimEnd()
}
