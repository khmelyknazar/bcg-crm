import { ProductsService } from './products.service.js';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): string;
}
