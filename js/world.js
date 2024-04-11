class World {
	constructor(graph, roadWith = 100, roadRoundness = 3){
		this.graph = graph;
		this.roadWith = roadWith;
		this.roadRoundness = roadRoundness;

		this.envelopes = [];

		this.generate();
	}

	generate() {
		this.envelopes.length = 0;
		for(const segment of this.graph.segments) {
			this.envelopes.push(
				new Envelope(segment, this.roadWith, this.roadRoundness)
			);
		}

		this.intersections = Polygon.break(
			this.envelopes[0].polygon,
			this.envelopes[1].polygon
		);
	}

	draw(ctx) {
		for (const envelope of this.envelopes){
			envelope.draw(ctx);
		}
	}
}