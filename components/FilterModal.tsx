import React, { useState } from 'react';
import {
	Modal,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	Dimensions,
	Animated,
	PanResponder,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FilterModalProps {
	visible: boolean;
	onClose: () => void;
	onApply: (filters: FilterState) => void;
}

interface FilterState {
	categories: string[];
	sortBy: 'popularity' | 'newest' | 'priceLowHigh' | 'priceHighLow';
	brands: string[];
	priceRange: [number, number];
}

const CATEGORIES = ['All Products', 'Shoes', 'Hoodies', 'Accessories', 'Watches'];
const BRANDS = [
	{ name: 'NexusBrand', count: 128 },
	{ name: 'FutureWear', count: 45 },
	{ name: 'UrbanTech', count: 21 },
];
const SORT_OPTIONS = [
	{ id: 'popularity', label: 'Popularity', icon: 'trending-up' as const },
	{ id: 'newest', label: 'Newest Arrivals', icon: 'plus-circle' as const },
	{ id: 'priceLowHigh', label: 'Price: Low to High', icon: 'arrow-up' as const },
	{ id: 'priceHighLow', label: 'Price: High to Low', icon: 'arrow-down' as const },
];

export default function FilterModal({ visible, onClose, onApply }: FilterModalProps) {
	const [selectedCategory, setSelectedCategory] = useState('All Products');
	const [selectedSort, setSelectedSort] = useState<'popularity' | 'newest' | 'priceLowHigh' | 'priceHighLow'>('popularity');
	const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
	const [priceRange, setPriceRange] = useState<[number, number]>([50, 1200]);

	const toggleBrand = (brand: string) => {
		setSelectedBrands((prev) =>
			prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
		);
	};

	const handleApply = () => {
		onApply({
			categories: [selectedCategory],
			sortBy: selectedSort,
			brands: selectedBrands,
			priceRange,
		});
		onClose();
	};

	const handleReset = () => {
		setSelectedCategory('All Products');
		setSelectedSort('popularity');
		setSelectedBrands([]);
		setPriceRange([50, 1200]);
	};

	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent={false}
			onRequestClose={onClose}
		>
			<SafeAreaView style={styles.container}>
				{/* Header */}
				<View style={styles.header}>
					<Text style={styles.headerTitle}>Filter & Sort</Text>
					<TouchableOpacity onPress={onClose} style={styles.closeButton}>
						<MaterialCommunityIcons name="close" size={24} color="#fff" />
					</TouchableOpacity>
				</View>

				{/* Scrollable Content */}
				<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
					{/* Categories Section */}
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>CATEGORIES</Text>
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={styles.categoriesScroll}
							contentContainerStyle={styles.categoriesContent}
						>
							{CATEGORIES.map((category) => (
								<TouchableOpacity
									key={category}
									style={[
										styles.categoryChip,
										selectedCategory === category && styles.categoryChipActive,
									]}
									onPress={() => setSelectedCategory(category)}
								>
									<Text
										style={[
											styles.categoryChipText,
											selectedCategory === category && styles.categoryChipTextActive,
										]}
									>
										{category}
									</Text>
								</TouchableOpacity>
							))}
						</ScrollView>
					</View>

					{/* Price Range Section */}
					<View style={styles.section}>
						<View style={styles.priceHeader}>
							<Text style={styles.sectionTitle}>PRICE RANGE</Text>
							<Text style={styles.priceValue}>
								${priceRange[0]} - ${priceRange[1]}
							</Text>
						</View>
						<View style={styles.sliderContainer}>
							<View style={styles.sliderTrack}>
								<View style={styles.sliderFill} />
								<View style={styles.sliderThumb} />
								<View style={[styles.sliderThumb, { right: '30%' }]} />
							</View>
							<View style={styles.sliderLabels}>
								<Text style={styles.sliderLabel}>$0</Text>
								<Text style={styles.sliderLabel}>$500</Text>
								<Text style={styles.sliderLabel}>$1000</Text>
								<Text style={styles.sliderLabel}>$2000+</Text>
							</View>
						</View>
					</View>

					{/* Sort By Section */}
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>SORT BY</Text>
						<View style={styles.sortOptions}>
							{SORT_OPTIONS.map((option) => (
								<TouchableOpacity
									key={option.id}
									style={[
										styles.sortOption,
										selectedSort === option.id && styles.sortOptionActive,
									]}
									onPress={() =>
										setSelectedSort(
											option.id as 'popularity' | 'newest' | 'priceLowHigh' | 'priceHighLow'
										)
									}
								>
									<View style={styles.sortOptionContent}>
										<MaterialCommunityIcons
											name={option.icon}
											size={20}
											color={selectedSort === option.id ? '#2b6cee' : '#9ca3af'}
										/>
										<Text
											style={[
												styles.sortOptionText,
												selectedSort === option.id && styles.sortOptionTextActive,
											]}
										>
											{option.label}
										</Text>
									</View>
									<View
										style={[
											styles.radioButton,
											selectedSort === option.id && styles.radioButtonActive,
										]}
									>
										{selectedSort === option.id && (
											<View style={styles.radioButtonDot} />
										)}
									</View>
								</TouchableOpacity>
							))}
						</View>
					</View>

					{/* Brands Section */}
					<View style={[styles.section, styles.lastSection]}>
						<Text style={styles.sectionTitle}>BRANDS</Text>
						<View style={styles.brandList}>
							{BRANDS.map((brand) => (
								<TouchableOpacity
									key={brand.name}
									style={styles.brandItem}
									onPress={() => toggleBrand(brand.name)}
								>
									<View style={styles.brandCheckboxContainer}>
										<View
											style={[
												styles.checkbox,
												selectedBrands.includes(brand.name) && styles.checkboxChecked,
											]}
										>
											{selectedBrands.includes(brand.name) && (
												<MaterialCommunityIcons
													name="check"
													size={14}
													color="#050505"
												/>
											)}
										</View>
										<Text style={styles.brandName}>{brand.name}</Text>
									</View>
									<Text style={styles.brandCount}>{brand.count}</Text>
								</TouchableOpacity>
							))}
						</View>
					</View>

					<View style={styles.spacer} />
				</ScrollView>

				{/* Footer with CTA */}
				<View style={styles.footer}>
					<TouchableOpacity onPress={handleReset}>
						<Text style={styles.resetText}>Reset all filters</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.applyButton} onPress={handleApply}>
						<Text style={styles.applyButtonText}>Show 142 Results</Text>
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#050505',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 24,
		paddingTop: 20,
		paddingBottom: 16,
	},
	headerTitle: {
		fontSize: 28,
		fontWeight: '800',
		color: '#fff',
		letterSpacing: -0.5,
	},
	closeButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: 'rgba(255, 255, 255, 0.08)',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
	},
	content: {
		flex: 1,
		paddingHorizontal: 24,
	},
	section: {
		marginTop: 24,
		marginBottom: 24,
	},
	lastSection: {
		marginBottom: 40,
	},
	sectionTitle: {
		fontSize: 11,
		fontWeight: '700',
		color: 'rgba(255, 255, 255, 0.5)',
		marginBottom: 12,
		letterSpacing: 0.5,
		textTransform: 'uppercase',
	},
	categoriesScroll: {
		marginHorizontal: -24,
		paddingHorizontal: 24,
	},
	categoriesContent: {
		gap: 8,
		paddingRight: 24,
	},
	categoryChip: {
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.1)',
		minHeight: 40,
		justifyContent: 'center',
	},
	categoryChipActive: {
		backgroundColor: 'rgba(43, 173, 238, 0.2)',
		borderColor: 'rgba(43, 173, 238, 0.5)',
	},
	categoryChipText: {
		fontSize: 12,
		fontWeight: '600',
		color: '#fff',
	},
	categoryChipTextActive: {
		color: '#2b6cee',
		fontWeight: '700',
	},
	priceHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-end',
		marginBottom: 12,
	},
	priceValue: {
		fontSize: 16,
		fontWeight: '700',
		color: '#2b6cee',
	},
	sliderContainer: {
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		borderRadius: 16,
		padding: 20,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.08)',
	},
	sliderTrack: {
		height: 6,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		borderRadius: 3,
		marginBottom: 16,
		position: 'relative',
		alignItems: 'center',
	},
	sliderFill: {
		position: 'absolute',
		left: '10%',
		right: '30%',
		height: 6,
		backgroundColor: '#2b6cee',
		borderRadius: 3,
	},
	sliderThumb: {
		position: 'absolute',
		left: '10%',
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: '#050505',
		borderWidth: 2,
		borderColor: '#2b6cee',
		top: -7,
	},
	sliderLabels: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	sliderLabel: {
		fontSize: 11,
		fontWeight: '600',
		color: 'rgba(255, 255, 255, 0.4)',
	},
	sortOptions: {
		gap: 8,
	},
	sortOption: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderRadius: 12,
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.08)',
	},
	sortOptionActive: {
		backgroundColor: 'rgba(43, 173, 238, 0.15)',
		borderColor: 'rgba(43, 173, 238, 0.4)',
	},
	sortOptionContent: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	sortOptionText: {
		fontSize: 14,
		fontWeight: '600',
		color: 'rgba(255, 255, 255, 0.7)',
	},
	sortOptionTextActive: {
		color: '#fff',
		fontWeight: '700',
	},
	radioButton: {
		width: 20,
		height: 20,
		borderRadius: 10,
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 255, 0.2)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	radioButtonActive: {
		borderColor: '#2b6cee',
	},
	radioButtonDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#2b6cee',
	},
	brandList: {
		gap: 8,
	},
	brandItem: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 8,
	},
	brandCheckboxContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		flex: 1,
	},
	checkbox: {
		width: 20,
		height: 20,
		borderRadius: 4,
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 255, 0.2)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	checkboxChecked: {
		backgroundColor: '#2b6cee',
		borderColor: '#2b6cee',
	},
	brandName: {
		fontSize: 16,
		fontWeight: '600',
		color: '#fff',
	},
	brandCount: {
		fontSize: 12,
		fontWeight: '600',
		color: 'rgba(255, 255, 255, 0.4)',
	},
	spacer: {
		height: 60,
	},
	footer: {
		paddingHorizontal: 24,
		paddingTop: 8,
		paddingBottom: 20,
		borderTopWidth: 1,
		borderTopColor: 'rgba(255, 255, 255, 0.05)',
	},
	resetText: {
		fontSize: 13,
		fontWeight: '700',
		color: 'rgba(255, 255, 255, 0.5)',
		textAlign: 'center',
		marginBottom: 12,
	},
	applyButton: {
		height: 56,
		backgroundColor: '#2b6cee',
		borderRadius: 16,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#2b6cee',
		shadowOffset: { width: 0, height: 8 },
		shadowOpacity: 0.4,
		shadowRadius: 12,
		elevation: 8,
	},
	applyButtonText: {
		fontSize: 16,
		fontWeight: '800',
		color: '#050505',
		letterSpacing: -0.3,
	},
});
