Math.rand = function mathRand(min, max) {
  return (min + (this.random() * (max - min)));
};
Math.randInt = function mathRandInt(min, max) {
  return Math.round(this.rand(min, max));
};
Math.randChoice = function mathRandChoice(choices) {
  return choices[this.randInt(0, choices.length - 1)];
};
Math.randBool = function mathRandBool() {
  return this.randChoice([true, false]);
};
Math.limit = function mathLimit(x, min, max) {
  return Math.max(min, Math.min(max, x));
};
Math.between = function mathBetween(n, min, max) {
  return ((n >= min) && (n <= max));
};
Math.accel = function mathAccel(v, accel, dt) {
  return v + (accel * dt);
};
Math.lerp = function mathLerp(n, dn, dt) {
  return n + (dn * dt);
};
// easing functions
Math.easeLerp = function mathEaseLerp(a ,b, percent) {
  return a + (b - a) * percent;
};
Math.easeIn = function mathEaseIn(a, b, percent) {
  return a + (b - a) * Math.pow(percent, 2);
};
Math.easeOut = function mathEaseOut(a, b, percent) {
  return a + (b - a) * (1 - Math.pow(1 - percent, 2));
};
Math.easeInOut = function mathEaseInOut(a,b,percent) {
  return a + (b - a) * ((-Math.cos(percent * Math.PI)/2) + 0.5);
};
Math.collBox = function mathCollBox(x1, y1, w1, h1, x2, y2, w2, h2) {
  return !(((x1 + w1 - 1) < x2) ||
           ((x2 + w2 - 1) < x1) ||
           ((y1 + h1 - 1) < y2) ||
           ((y2 + h2 - 1) < y1));
};
// Collcir may need some tweaking
Math.collCir = function mathCollCir(ent1, ent2) {
  var dx = ent1.x - ent2.x;
  var dy = ent1.y - ent2.y;
  var d = (dx * dx) + (dy * dy);
  return (d < (ent1.r + ent2.r) * (ent1.r + ent2.r));
};

















/*
Math.collLineIntercept = function mathColLineIntercept(x1, y1, x2, y2, x3, y3, x4, y4, d) {
  var denom = ((y4-y3) * (x2-x1)) - ((x4-x3) * (y2-y1));
  if (denom != 0) {
    var ua = (((x4-x3) * (y1-y3)) - ((y4-y3) * (x1-x3))) / denom;
    if ((ua >= 0) && (ua <= 1)) {
      var ub = (((x2-x1) * (y1-y3)) - ((y2-y1) * (x1-x3))) / denom;
      if ((ub >= 0) && (ub <= 1)) {
        var x = x1 + (ua * (x2-x1));
        var y = y1 + (ua * (y2-y1));
        return { x: x, y: y, d: d };
      }
    }
  }
  return null;
};
*/
//polygon collision??






/*
ADD 3D?
2D VECTOR STUFF! NEEDS TO BE PORTED TO JS
//PLEASE THINK ABOUT FLOATING NUMBERS AND STABILITY IN REGARDS TO ROUND-OFF ERRORS
//PLEASE DO NOT OVER-CONSTRUCT. IT'S EXPENSIVE!
//WATCH OUT FOR SPECIAL CASES. (POINTS ON LINES, ETC)

class Vector2D ():
  def __init__(self, x, y):
    self.x = x
    self.y = y

  def __str__(self):
      return '[%f, %f]' % (self.x, self.y)

  def neg(self):
    return Vector2D(-self.x, -self.y)

  def add(self, other):
    x_sum = self.x + other.x
    y_sum = self.y + other.y

    return Vector2D(x_sum, y_sum)

  def sub(self, other):
    x_dif = self.x - other.x
    y_dif = self.y - other.y

    return Vector2D(x_dif, y_dif)

  def sqr_length(self):
    return self.x * self.x + self.y * self.y

  def length(self):
    return sqrt(self.sqr_length())

  def scale(self, factor):
    return Vector2D(self.x * factor, self.y * factor)

  def duplicate(self):
    return Vector2D(self.x, self.y)

  def normalize(self):
    v = self.duplicate()
    v.normalize_inplace()
    return v

  def equals(self, other):
    return sqr(self.x - other.x) + sqr(self.y - other.y) &lt; ZERO_DISTANCE_SQR

  def perp_op(self):
    return Vector2D(-self.y, self.x)

  def dot(self, other):
    return self.x * other.x + self.y * other.y

  def perpdot(self, other):
    return - self.y * other.x + self.x * other.y

  def proj_on(self, other):
    scale_factor = self.dot(other)/other.sqr_length()
    new_vector = other.scale(scale_factor)
    return new_vector

  def perp_on(self, other):
    scale_factor = -(self.perpdot(other)/other.sqr_length())
    new_vector = other.scale(scale_factor)
    return new_vector



NOTE: THERE ARE SOME ISSUES WITH THIS IMPLEMENTATION OF A POLYGON
class Polygon:
  def __init__(self, vertices):
    self.vertices = vertices #list of vertices as vectors.
    self.vertex_count = len(self.vertices)

  def get_edge_line(self, index):
    vertex1 = self.vertices[index]
    vertex2 = self.vertices[(index + 1) % self.vertex_count]
    direction = vertex2.sub(vertex1)
Segment = Polygon
segment = Segment([Vector2D(-1, 1), Vector2D(1, -1)])



CIRCLES
def distance_of_point_from_line(point, line):
  line_to_point = point.sub(line.point)
  return line_to_point.perp_on(line.direction).length()



DISTANCES
def dist(v1, v2):
  return v1.sub(v2).length()
def distance_of_point_from_line(point, line):
  line_to_point = point.sub(line.point)
  return line_to_point.perp_on(line.direction).length()

def sqr_distance_of_point_from_line(point, line):
  line_to_point = point.sub(line.point)
  return line_to_point.perp_on(line.direction).sqr_length()



PARALLEL & PERPENDICULAR
//EXPENSIVE
def is_parallel1(line1, line2):
  v = line1.direction.normalize()
  w = line2.direction.normalize()
//INEXPENSIVE & FAULTY IF DIRECTIONS ARE NOT NORMALIZED
def is_parallel(line1, line2):
  v = line1.direction
  w = line2.direction
  return abs(v.perpdot(w)) &lt; 0.001
//INEXPENSIVE & UNECESSARY IF DIRECTIONS ARE NORMALIZED
  return v.equals(w) or v.equals(w.neg())
def is_parallel(line1, line2):
  v = line1.dir.normalize_duplicate()
  w = line2.dir.normalize_duplicate()
  return abs(perpdot(v, w)) &lt; 0.001
def is_perpendicular(line1, line2):
  v = line1.direction
  w = line2.direction
  return abs(v.dot(w)) &lt; 0.001



def is_point_on_same_side_of_line(line, point1, point2):
  v1 = point1.sub(line.point)
  v2 = point2.sub(line.point)
  if line.direction.perpdot(v1)*line.direction.perpdot(v2) &gt; 0:
    return True



def is_line_between_points(line, point1, point2):
  proj1 = point1.sub(line.point).perpdot(line.direction)
  proj2 = point2.sub(line.point).perpdot(line.direction)
  return  proj1 * proj2 &lt; 0



BISECTION
def bisect_segment(segment):
  center = segment.vertices[0].add(segment.vertices[1]).scale(0.5)
//IF 180 DEGRESS SELECT ONE VECTOR ARBITRARILY
def bisect_angle(v1, v2):
  return v1.normalize().add(v2.normalize())



def inside_view_cone(view_vertex_pos, view_direction, halfview_cosine, object_pos):
  object_vector = object_pos.sub(view_vertex_pos)
  object_cosine = object_vector.dot(view_direction)/(object_vector.length()*view_direction.length())
  return object_cosine &gt; halfview_cosine



POLYGONS
//CHANGE TO WORK FOR POLYGONS OF 3 OR MORE VERTICES. CONSIDER USING APPLY
def triangle_centroid(triangle):
  centroid = triangle.vertices[0].add(triangle.vertices[1].add(triangle.vertices[2])).scale(1.0 / 3.0)
  return centroid
def is_polygon_convex(polygon, point):
  for vertex_index in range(polygon.vertex_count):
    edge_line = polygon.get_edge_line(vertex_index)
    if vertex_index == polygon.vertex_count:
      next_vertex_index = 0
    else:
      next_vertex_index = vertex_index + 1
    next_edge_line = polygon.get_edge_line(next_vertex_index)
    if vertex_index == 0:
      direction = signum(edge_line.perpdot(next_edge_line))
    else:
      if signum(edge_line.perpdot(next_edge_line)) != direction_sign:
        return False
  return True
def point_inside_convex_polygon(polygon, point):
  interior_point = triangle_centroid(polygon)
  for vertex_index in range(polygon.vertex_count):
    edge_line = polygon.get_edge_line(vertex_index)
    if not is_point_on_same_side_of_line(edge_line, interior_point, point):
      return False
  return True



INTERSECTION
def lines_intersect(line1, line2):
   not lines_parallel(line2, line2)
def line_segments_intersects(segment1, segment2):
  if not is_line_between_points(segment1.get_edge_line(0), segment2.vertices[0], segment2.vertices[1]):
    return False
  return is_line_between_points(segment2.get_edge_line(0), segment1.vertices[0], segment1.vertices[1])
def line_intersects_circle(line, circle):
  line_to_circle = circle.center.sub(line.point)
  return sqr(line.direction.perpdot(line_to_circle)) &lt;= line.direction.sqr_length() * sqr(circle.radius)
def circles_intersect(circle1, circle2):
  circle_to_circle = circle2.center.sub(circle1.point)
  return circle_to_circle.square_length() &lt;= sqr(circle1.radius + circle2.radius)
*/
