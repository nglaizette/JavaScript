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

		Polygon.multiBreak(this.envelopes.map((envelope) => envelope.polygon));
	}

	draw(ctx) {
		for (const envelope of this.envelopes){
			envelope.draw(ctx);
		}
	}
}