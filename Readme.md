# DataPack
DataPack provides a method to describe subgraphs with RDF metadata.


## Provenance
Todo

## Policies
Todo

## Signatures
The generation, serialization and deserialization of crypto keys in this library (for now) makes use of the Elliptic Curve Digital Signature Algorithm (ECDSA) with a [P-384 elliptic curve](https://en.wikipedia.org/wiki/P-384).
The signatures are done using a SHA 512 hash algorithm over the RDF dataset canonicalization using [rdfjs-c14n](https://www.npmjs.com/package/rdfjs-c14n).
To canonicalize N3, we serialize it to RDF 1.1 quads, over which we then execute the canonicalization algorithm.

## Package Modeling

### N3

#### Example

```
@prefix : <https://example.org/ns/example#>.
@prefix pack: <https://example.org/ns/package#>.
@prefix sign: <https://example.org/ns/signature#>.
@prefix pol: <https://example.org/ns/policy#>.
@prefix xsd: <http://www.w3.org/2001/XMLSchema#>.
@prefix vcard: <://www.w3.org/2006/vcard/ns#>.

[] pack:package {
    [] pack:content {
        :Bob vcard:bday "2000-01-01T09:00:00.000Z"^^xsd:dateTime .
    } ;
        pack:origin :Endpoint ;
        pack:createdAt "2024-01-08T17:08:52.165Z"^^xsd:dateTime ;
        pack:hasContentSignature [
            a sign:Signature ;
            sign:issuer :Alice ;
            sign:created "2024-01-08T17:08:52.166Z"^^xsd:dateTime ;
            sign:proofValue "sSJ0xHT7yH2MeYjI6I7fVy+PRfh/EDJkTEOhbCA2BYcd+GBJRD1BQV1rwVe69cNPHhtvGKbITIf7TBlbpkE6YANMNNS2aSQMw8i6TLTXa16zhukp+V1nLYKE/51rt/Us".
    ] .
} .
```


### RDF 1.1 
This is not yet available

# Todo

[ ] Look into a supporting a generic set of  algorithms for crypto key generation, serialization and deserialization
[ ] Look into a supporting a generic set of  algorithms for signatures
[ ] Have concrete ontologies for crypto key storage
[ ] Have concrete ontologies for provenance data modeling
[ ] Have concrete ontologies for signature data modeling
[ ] Have concrete ontologies for policy data modeling

[ ] Have a separate implementation using RDF 1.1 instead of N3