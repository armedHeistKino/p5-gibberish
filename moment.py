from dataclasses import dataclass
import math

@dataclass
class Vertex:
    x:float = 0.00
    y:float = 0.00
    z:float = 0.00

def inner_prod(a:Vertex, b:Vertex):
    assert type(a) is Vertex
    assert type(b) is Vertex

    return a.x*b.x + a.y*b.y + a.z*b.z

def outer_prod(a:Vertex, b:Vertex):
    assert type(a) is Vertex
    assert type(b) is Vertex

    return Vertex(a.y*b.z - a.z*b.y, a.z*b.x - a.x*b.z, a.x*b.y - a.y*b.x)

def magnitude(a:Vertex):
    return math.sqrt(a.x*a.x + a.y*a.y + a.z*a.z)

P = []
a = 100

P.append(Vertex(a*math.cos(math.pi/3), 0, 0))
P.append(Vertex(-(a/2)*math.cos(math.pi/3), (a/2)*math.sin(math.pi/3), 0))
P.append(Vertex(-(a/2)*math.cos(math.pi/3), -(a/2)*math.sin(math.pi/3), 0))

def rotational_inertia(mass: float, pnts: list[Vertex]):
    # assert type(mass) is float
    # assert type(pnts) is list[Vertex]

    number = 0
    divisor = 0

    for i in range(len(pnts)-1):
        # j = 0 if i == len(pnts)-1 else i+1
        j = i+1

        outer = magnitude(outer_prod(pnts[j], pnts[i]))
        inner = inner_prod(pnts[i], pnts[i]) + inner_prod(pnts[i], pnts[j]) + inner_prod(pnts[j], pnts[j])

        number += outer * inner
        divisor += outer

    return (mass * number) / (6 * divisor)

print(rotational_inertia(12.0, P))

def regular_triangle_inertia(mass: float, a: float):
    return 3/4*(1/12)* mass * a**2

print(regular_triangle_inertia(12.0, a))


sq = [Vertex(3,3,0), Vertex(-3,3,0), Vertex(-3,-3,0), Vertex(3,-3,0)]

print('sq1', rotational_inertia(12.0, sq))
print('sq1', (1/12)*12.0*2*6**2)

a = 10

pent = [
    Vertex(a, 0, 0),
    Vertex(a * math.cos(2*math.pi/5), a * math.sin(2*math.pi/5), 0),
    Vertex(a * math.cos(4*math.pi/5), a * math.sin(4*math.pi/5), 0),
    Vertex(a * math.cos(6*math.pi/5), a * math.sin(6*math.pi/5), 0),
    Vertex(a * math.cos(8*math.pi/5), a * math.sin(8*math.pi/5), 0)
]

print(rotational_inertia(12.0, pent))

print(1/10 * 12 * 10**2)